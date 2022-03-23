<template>
    <div>
        <div>
            <div class="content" style="padding-top: 30px">
                <div class="container-fluid">
                    <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
                    <div
                        class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20"
                    >
                        <p style="height: 40px">
                            <Button
                                @click="addModal2 = true"
                                class="add-category"
                                >Using My Meta mask
                            </Button>
                            <Button
                                @click="addModal = true"
                                class="add-category"
                                ><Icon type="md-add" />Add New User with
                                Collection Name
                            </Button>
                            <Button
                                @click="goto_install_bot"
                                class="install-bot"
                                >Install bot
                            </Button>
                        </p>

                        <div class="_table_div">
                            <table class="_table">
                                <!-- TABLE TITLE -->
                                <tr>
                                    <th class="subcategory-image">
                                        <span>Wallet Address</span>
                                    </th>
                                    <th class="subcategory-name">
                                        <span>Collection Name</span>
                                    </th>
                                    <th class="subcategory-name">
                                        <span>NFT Count</span>
                                    </th>
                                    <th class="subcategory-price">
                                        <span>Has NFT</span>
                                    </th>
                                </tr>
                                <!-- TABLE TITLE -->

                                <!-- ITEMS -->
                                <tr v-for="(item, i) in items" :key="i">
                                    <td style="text-align: center">
                                        <span>{{ item.walletaddress }}</span>
                                    </td>
                                    <td style="text-align: center">
                                        <span>{{ item.collectionName }}</span>
                                    </td>
                                    <td style="text-align: center">
                                        <span>{{ item.count }}</span>
                                    </td>
                                    <td style="text-align: center">
                                        <span v-if="item.is_exist_nft == true"
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
                    <div class="row">
                        <div class="col-md-12">
                            <label
                                for="tokenid"
                                style="
                                    font-weight: bold;
                                    width: 150px;
                                    float: left;
                                    margin-top: 5px;
                                "
                                >NFT Token ID:</label
                            >
                            <Input
                                id="item-name"
                                class="item-input"
                                style="float: left; width: 75%"
                                v-model="contrack_address_token_id"
                                placeholder="Please input NFT
                    Token ID"
                            />
                            <Button
                                class="add-category"
                                style="float: left; margin-left: 10px"
                                @click="searchrole"
                                ><Icon type="md-add" />Search Role
                            </Button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div
                                class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20"
                            >
                                <div class="_table_div">
                                    <table class="_table">
                                        <!-- TABLE TITLE -->
                                        <tr>
                                            <th class="subcategory-image">
                                                <span>NFT images</span>
                                            </th>
                                            <th class="subcategory-name">
                                                <span>NFT Name</span>
                                            </th>
                                            <th class="subcategory-name">
                                                <span>NFT Property</span>
                                            </th>
                                            <th class="subcategory-name">
                                                <span>Assign Role Buttons</span>
                                            </th>
                                        </tr>
                                        <!-- TABLE TITLE -->

                                        <!-- ITEMS -->
                                        <tr v-for="(nfts, i) in nfts" :key="i">
                                            <td style="text-align: center">
                                                <img
                                                    v-bind:src="nfts.img_url"
                                                    width="100px"
                                                />

                                                <!-- <span>{{ nfts.img_url }}</span> -->
                                            </td>
                                            <td style="text-align: center">
                                                <span>{{ nfts.name }}</span>
                                            </td>
                                            <td style="text-align: center">
                                                <span
                                                    v-for="(
                                                        property, j
                                                    ) in nfts.property"
                                                    :key="j"
                                                    >{{
                                                        property.trait_type
                                                    }}={{ property.value }}<br
                                                /></span>
                                            </td>
                                            <td style="text-align: center">
                                                <Button
                                                    style="
                                                        float: relative;
                                                        width: 200px;
                                                        height: 50px;
                                                    "
                                                    @click="assignrole(i)"
                                                    ><Icon
                                                        type="md-add"
                                                    />Assign Role
                                                </Button>
                                            </td>
                                        </tr>
                                        <!-- ITEMS -->
                                    </table>
                                </div>
                            </div>
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
                                >Wallet Address:</label
                            >
                            <Input
                                id="item-name"
                                class="item-input"
                                v-model="data.walletaddress"
                                placeholder="Please input wallet address"
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
                                placeholder="Please input collection address"
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

                    <!-- Using Meta Mask Model -->
                    <Modal
                        id="metamask-use"
                        v-model="addModal2"
                        title="Use My Meta Mask"
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
                                v-model="meta_mask_user.collectionName"
                                placeholder="Please input collection address"
                            />
                        </div>

                        <div slot="footer">
                            <Button type="default" @click="addModal2 = false"
                                >Cancel</Button
                            >
                            <Button
                                type="primary"
                                @click="using_metamask"
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
import Web3 from "web3";
export default {
    name: "DiscordBot",
    mounted() {
        this.connectToWallet();
    },
    data() {
        return {
            data: {
                walletaddress: "",
                collectionName: "",
                count: 0,
                primary_asset_contracts_address: "",
            },
            meta_mask_user: {
                walletaddress: "0x3a05aa124f70e6aba2c524594314637842102c75",
                collectionName: "",
                count: 0,
                primary_asset_contracts_address: "",
            },
            // nft_info: {
            //     img_url: "",
            //     background: "",
            //     eyes: "",
            //     bread: "",
            // },
            contrack_address_token_id: "",
            addModal: false,
            addModal2: false,
            wallet_source: 0,
            isAdding: false,
            is_exist_nft: false,
            items: [],
            nfts: [],
            property: [],
            url_data: "",
        };
    },

    methods: {
        async connectToWallet() {
            //connect the metamask using web3 and get current user account
            let web3;
            try {
                if (window.ethereum) {
                    web3 = new Web3(window.ethereum);
                    await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                } else if (window.web3) {
                    web3 = new Web3(
                        window.web3.currentProvider ||
                            "https://data-seed-prebsc-1-s1.binance.org:8545"
                    );
                }
                const accounts = await web3.eth.getAccounts();
                console.log(accounts[0]);
                this.meta_mask_user.walletaddress = accounts[0];
                return accounts[0];
            } catch (error) {
                console.log("Error: ", error);
                return false;
            }
        },
        async goto_install_bot() {
            window.open(
                "https://discord.com/api/oauth2/authorize?client_id=948745534368284692&permissions=8&scope=bot"
            );
        },
        async using_metamask() {
            this.wallet_source = 2;
            var url =
                "https://api.opensea.io/api/v1/collections?asset_owner=" +
                this.meta_mask_user.walletaddress +
                "&offset=0&limit=300";
            // this.data.walletaddress, this.data.collectionName
            if (this.meta_mask_user.collectionName == "") {
                this.w("Input data!");
            } else {
                var res = await this.callApi("get", url);

                console.log(res);

                if (res.status == 200) {
                    var addrInfo = res.data;
                    var walletInfo = [];

                    for (var i = 0; i < addrInfo.length; i++) {
                        var item = addrInfo[i];
                        var walletItem = {};

                        if (item.primary_asset_contracts.length > 0) {
                            var contracts = item.primary_asset_contracts;
                            var walletContract = []; // contract
                            if (
                                item.name == this.meta_mask_user.collectionName
                            ) {
                                this.meta_mask_user.primary_asset_contracts_address =
                                    item.primary_asset_contracts[0].address;
                                console.log(
                                    "Primary Asset Contracts Address:" +
                                        this.meta_mask_user
                                            .primary_asset_contracts_address
                                );
                            }

                            for (var j = 0; j < contracts.length; j++) {
                                walletContract.push({
                                    contractAddr: contracts[j].address,
                                    schema: contracts[j].schema_name,
                                    name: contracts[j].name,
                                    collectionAddr: contracts[j].payout_address,
                                });
                            }

                            walletItem = {
                                contract: walletContract,
                                name: item.name,
                                nftCount: item.owned_asset_count,
                            };

                            walletInfo.push(walletItem);
                        }
                    }

                    console.log("wallet info => ", walletInfo);

                    for (i = 0; i < walletInfo.length; i++) {
                        console.log(
                            walletInfo[i].name + "  " + walletInfo[i].nftCount
                        );
                        if (
                            walletInfo[i].name ==
                                this.meta_mask_user.collectionName &&
                            walletInfo[i].nftCount > 0
                        ) {
                            this.meta_mask_user.count = walletInfo[i].nftCount;
                            this.is_exist_nft = true;
                        }

                        // console.log("NFT's Exist:" + this.is_exist_nft);
                    }
                    // console.log("result => ", walletInfo);

                    this.addModal2 = false;
                    this.isAdding = false;
                    if (this.is_exist_nft == true) {
                        this.s("There exists NFT on this collection!");
                    } else if (this.is_exist_nft == false) {
                        this.w(
                            "There is no this collection or no NFT in this collection!"
                        );
                    }
                    this.items.push({
                        walletaddress: this.meta_mask_user.walletaddress,
                        collectionName: this.meta_mask_user.collectionName,
                        count: this.meta_mask_user.count,
                        is_exist_nft: this.is_exist_nft,
                    });
                    // console.log("Items => ", this.items);
                } else {
                    this.w("Something went wrong!");
                }
            }
            // this.meta_mask_user.walletaddress = "";
            // this.meta_mask_user.collectionName = "";
            this.meta_mask_user.count = 0;
            this.is_exist_nft = false;
        },
        async searchrole() {
            var url,
                img_url,
                name = "";
            var traits = [];
            var i = 0;

            if (this.contrack_address_token_id == "") {
                this.w("Input data!");
            } else {
                if (this.wallet_source === 1) {
                    url =
                        "https://api.opensea.io/api/v1/asset/" +
                        this.data.primary_asset_contracts_address +
                        "/" +
                        this.contrack_address_token_id +
                        "/";
                    var res1 = await this.callApi("get", url);

                    traits = res1.data.traits;
                    img_url = res1.data.image_url;
                    name = res1.data.name;
                    console.log(res1);
                    console.log(img_url);
                    console.log(traits);
                    for (i = 0; i < traits.length; i++) {
                        if (traits[i].trait_type === "Background")
                            this.property.push({
                                trait_type: traits[i].trait_type,
                                value: traits[i].value,
                            });
                    }

                    console.log(this.property);

                    this.nfts.push({
                        name: name,
                        img_url: img_url,
                        property: this.property,
                    });
                    console.log(this.nfts);
                    this.property = [];
                } else if (this.wallet_source === 2) {
                    url =
                        "https://api.opensea.io/api/v1/asset/" +
                        this.meta_mask_user.primary_asset_contracts_address +
                        "/" +
                        this.contrack_address_token_id +
                        "/";
                    var res2 = await this.callApi("get", url);

                    traits = res2.data.traits;
                    img_url = res2.data.image_url;
                    name = res2.data.name;
                    console.log(res2);
                    console.log(img_url);
                    console.log(traits);
                    for (i = 0; i < traits.length; i++) {
                        if (traits[i].trait_type === "Background")
                            this.property.push({
                                trait_type: traits[i].trait_type,
                                value: traits[i].value,
                            });
                    }

                    console.log(this.property);

                    this.nfts.push({
                        name: name,
                        img_url: img_url,
                        property: this.property,
                    });
                    console.log(this.nfts);
                    this.property = [];
                }
            }
        },
        async assignrole(i) {
            var property = this.nfts[i].property;
            console.log(property);
            var queryDict = {};
            location.search
                .substr(1)
                .split("&")
                .forEach(function (item) {
                    queryDict[item.split("=")[0]] = item.split("=")[1];
                });
            console.log("here =>", queryDict);

            var guildID = queryDict.guild;
            var channelID = queryDict.channel;
            var userID = queryDict.user;

            console.log(guildID, channelID, userID);
            var url = "http://localhost:3001/api/collection";
            var res = await this.callApi("post", url, {
                guild: guildID,
                user: userID,
                properties: property,
            });
            console.log(res);
        },
        async addItem() {
            this.wallet_source = 1;
            var url =
                "https://api.opensea.io/api/v1/collections?asset_owner=" +
                this.data.walletaddress +
                "&offset=0&limit=300";
            // this.data.walletaddress, this.data.collectionName
            if (
                this.data.walletaddress == "" ||
                this.data.collectionName == ""
            ) {
                this.w("Input data!");
            } else {
                var res = await this.callApi("get", url);

                console.log(res);

                if (res.status == 200) {
                    var addrInfo = res.data;
                    var walletInfo = [];

                    for (var i = 0; i < addrInfo.length; i++) {
                        var item = addrInfo[i];
                        var walletItem = {};

                        if (item.primary_asset_contracts.length > 0) {
                            var contracts = item.primary_asset_contracts;
                            var walletContract = []; // contract
                            if (item.name == this.data.collectionName) {
                                this.data.primary_asset_contracts_address =
                                    item.primary_asset_contracts[0].address;
                                console.log(
                                    "Primary Asset Contracts Address:" +
                                        this.data
                                            .primary_asset_contracts_address
                                );
                            }

                            for (var j = 0; j < contracts.length; j++) {
                                walletContract.push({
                                    contractAddr: contracts[j].address,
                                    schema: contracts[j].schema_name,
                                    name: contracts[j].name,
                                    collectionAddr: contracts[j].payout_address,
                                });
                            }

                            walletItem = {
                                contract: walletContract,
                                name: item.name,
                                nftCount: item.owned_asset_count,
                            };

                            walletInfo.push(walletItem);
                        }
                    }

                    console.log("wallet info => ", walletInfo);

                    for (i = 0; i < walletInfo.length; i++) {
                        console.log(
                            walletInfo[i].name + "  " + walletInfo[i].nftCount
                        );
                        if (
                            walletInfo[i].name == this.data.collectionName &&
                            walletInfo[i].nftCount > 0
                        ) {
                            this.data.count = walletInfo[i].nftCount;
                            this.is_exist_nft = true;
                        }

                        // console.log("NFT's Exist:" + this.is_exist_nft);
                    }
                    // console.log("result => ", walletInfo);

                    this.addModal = false;
                    this.isAdding = false;
                    if (this.is_exist_nft == true) {
                        this.s("There exists NFT on this collection!");
                    } else if (this.is_exist_nft == false) {
                        this.w(
                            "There is no this collection or no NFT in this collection!"
                        );
                    }
                    this.items.push({
                        walletaddress: this.data.walletaddress,
                        collectionName: this.data.collectionName,
                        count: this.data.count,
                        is_exist_nft: this.is_exist_nft,
                    });
                    // console.log("Items => ", this.items);
                } else {
                    this.w("Something went wrong!");
                }
            }
            // this.data.walletaddress = "";
            // this.data.collectionName = "";
            this.data.count = 0;
            this.is_exist_nft = false;
        },
    },

    async created() {},
};
</script>

<style scoped>
img {
    width: 150px;
}
.add-category {
    float: right;
}
.install-bot {
    float: right;
    margin-right: 10px;
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
