import axios from "axios";

export function setSalesMotionInfo(info) {
    return axios.post("/salesmotion/"+info.account_id+"/"+info.salesmotion_id+"/"+info.status_id)
        .then(response =>  {
            if(response.data.length > 0) {
                return(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function getData(surname, firstname) {
    return axios.get("/pss/"+surname+"/"+firstname)
        .then(response =>  {
            if(response.data.length > 0) {
                return(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function getMotionData(ids) {
    return axios({
        url: '/accounts/getMotions',
        method: 'post',
        data: ids
    }).then(response =>  {
            if(response.data.length > 0) {
                return(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function getAccountData(id) {
    return axios({
        url: '/accounts/getAccount/'+id,
        method: 'get'
    }).then(response =>  {
            if(response.data.length > 0) {
                return(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function getCategoriesData() {
    return axios({
        url: '/categories/getAll',
        method: 'get'
    }).then(response =>  {
            if(response.data.length > 0) {
                return(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}