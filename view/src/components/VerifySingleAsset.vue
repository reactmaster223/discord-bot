<template>
    <div>
        <div>
            <div class="content">
                <div class="container-fluid">
                    <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
                    <div
                        class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20"
                    >
                        <p style="height: 40px">
                            <Button
                                @click="addModal = true"
                                class="add-category"
                                ><Icon type="md-add" />Add New User with
                                Collection Name
                            </Button>
                        </p>

                        <div class="_table_div">
                            <table class="_table">
                                <!-- TABLE TITLE -->
                                <tr>
                                    <th class="subcategory-image">
                                        <span>User Name</span>
                                    </th>
                                    <th class="subcategory-name">
                                        <span>Email Address</span>
                                    </th>
                                    <th class="subcategory-name">
                                        <span>Collection Name</span>
                                    </th>
                                    <th class="subcategory-price">
                                        <span>NFT Existence</span>
                                    </th>
                                </tr>
                                <!-- TABLE TITLE -->

                                <!-- ITEMS -->
                                <tr v-for="(item, i) in items" :key="i">
                                    <td style="text-align: center">
                                        <span>{{ item.userName }}</span>
                                    </td>
                                    <td style="text-align: center">
                                        <span>{{ item.userEmail }}</span>
                                    </td>
                                    <td style="text-align: center">
                                        <span>{{ item.collectionName }}</span>
                                    </td>
                                    <td style="text-align: center">
                                        <span v-if="item.nftExistence == true"
                                            ><i class="la la-check exist"></i
                                        ></span>
                                        <span v-else
                                            ><i
                                                class="la la-close non-exist"
                                            ></i
                                        ></span>
                                    </td>
                                </tr>
                                <!-- ITEMS -->
                            </table>
                        </div>
                    </div>
                    <!-- Tag adding modal -->
                    <Modal
                        id="add-user-collection"
                        v-model="addModal"
                        title="Add New User With Collection Name"
                        :mask-closable="false"
                        :closable="false"
                    >
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                margin-bottom: 5px;
                            "
                        >
                            <label
                                for="item-name"
                                style="
                                    font-weight: bold;
                                    margin-right: 15px;
                                    margin-bottom: 0px;
                                    width: 150px;
                                "
                                >User Name:</label
                            >
                            <Input
                                id="item-name"
                                class="item-input"
                                v-model="data.userName"
                                placeholder="Please input User Name"
                            />
                        </div>

                        <div
                            style="
                                display: flex;
                                align-items: center;
                                margin-bottom: 5px;
                            "
                        >
                            <label
                                for="item-function-name"
                                style="
                                    font-weight: bold;
                                    margin-right: 0px;
                                    margin-bottom: 0px;
                                    width: 170px;
                                "
                                >Email Address:</label
                            >
                            <Input
                                id="item-function-name"
                                class="item-input"
                                type="email"
                                v-model="data.emailAddress"
                                placeholder="Please input User Email Address"
                            />
                        </div>

                        <div
                            style="
                                display: flex;
                                align-items: center;
                                margin-bottom: 5px;
                            "
                        >
                            <label
                                for="item-image"
                                style="
                                    font-weight: bold;
                                    margin-right: 15px;
                                    margin-bottom: 0px;
                                    width: 150px;
                                "
                                >Collection Name:</label
                            >
                            <Input
                                id="item-image"
                                class="item-input"
                                v-model="data.collectionName"
                                placeholder="Please input collection name"
                            />
                        </div>

                        <div slot="footer">
                            <Button type="default" @click="addModal = false"
                                >Cancel</Button
                            >
                            <Button
                                type="primary"
                                @click="addItem"
                                :disabled="isAdding"
                                :loading="isAdding"
                                >{{ isAdding ? "Adding.." : "Add" }}</Button
                            >
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VerifySingleAsset",
    data() {
        return {
            data: {
                userName: "",
                emailAddress: "",
                collectionName: "",
            },
            addModal: false,
            isAdding: false,
            nftExistence: false,
            items: [],
        };
    },

    methods: {
        async addItem() {
            if (this.data.collectionName.trim() == "")
                return this.e("Required Field");
            this.isAdding = true;
            const res = await this.callApi(
                "post",
                "http://localhost:3001/api/collection",
                {
                    collectionName: this.data.collectionName,
                }
            );
            console.log("added res status => ", res);
            if (res.status == 200) {
                this.addModal = false;
                this.isAdding = false;
                if (res.data.collection.primary_asset_contracts.length) {
                    res.data.collection.primary_asset_contracts.forEach(
                        (item) => {
                            if (item.asset_contract_type == "non-fungible") {
                                this.nftExistence = true;
                            }
                        }
                    );
                    if (this.nftExistence == true) {
                        this.s("There exists NFT on this collection!");
                    } else if (this.nftExistence == false) {
                        this.w("There is no NFT on this collection!");
                    }
                    this.items.push({
                        userName: this.data.userName,
                        userEmail: this.data.emailAddress,
                        collectionName: this.data.collectionName,
                        nftExistence: this.nftExistence,
                    });
                    console.log("Items => ", this.items);
                } else {
                    this.items.push({
                        userName: this.data.userName,
                        userEmail: this.data.emailAddress,
                        collectionName: this.data.collectionName,
                        nftExistence: this.nftExistence,
                    });
                    this.w("There is no NFT on this collection!");
                }
            } else {
                this.w("Something went wrong!");
            }
            this.data.userName = "";
            this.data.emailAddress = "";
            this.data.collectionName = "";
            this.nftExistence = false;
        },
    },

    async created() {},
};
</script>

<style scoped>
.add-category {
    float: right;
}
.subCategory-action {
    text-align: center;
}
.subcategory-id {
    text-align: center;
}
.subcategory-name {
    text-align: center;
}
.subcategory-image {
    text-align: center;
}
.subcategory-name {
    text-align: center;
}
.subcategory-price {
    text-align: center;
}
.subcategory-in-offer {
    text-align: center;
}
.update-category {
    margin-bottom: 5px;
    width: 90px;
}
.delete-category {
    margin-bottom: 5px;
    width: 90px;
}
.item-input {
    margin-bottom: 10px;
}
.item-inOffer {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 10px;
}
.item-in-offer-field {
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.exist {
    font-size: 30px;
    font-weight: bold;
    color: rgb(39 199 81);
}
.non-exist {
    font-size: 30px;
    font-weight: bold;
    color: rgb(231 15 45);
}
</style>
<style>
#add-user-collection .ivu-modal-wrap .ivu-modal {
    width: 610px !important;
}
</style>
