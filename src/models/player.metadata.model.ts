interface PlayerMetaDataModel {
    _id: string,
    username: string,
    avatar: string,
    global_name: string,
    email: string,
}

class PlayerMetaDataModelObject implements PlayerMetaDataModel {
    _id: string;
    username: string;
    avatar: string;
    global_name: string;
    email: string;

    constructor() {
        this._id = ""
        this.username = ""
        this.avatar = ""
        this.global_name = ""
        this.email = ""
    }

    setData(data : PlayerMetaDataModel){
        this._id = data._id
        this.username = data.username
        this.avatar = data.avatar
        this.global_name = data.global_name
        this.email = data.email
    }
}

export {PlayerMetaDataModelObject}