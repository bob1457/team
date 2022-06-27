import { connect } from "mongoose";

export async function Connect(dbname: string, host: string, user?: string, password?: string) {
    
    let uri = '';

    if(user && password){
        uri = `${user}:${password}@${host}/${dbname}`;
    }
    
    uri = `${host}/${dbname}`;
    console.log(uri);

    connect(uri).then(() => {
        console.log(`Connected to ${dbname} on mongodb...` );
    })
    .catch((err) => {
        console.log('Error occured conecting to mongodb: ' + err.message);
    })
    
}
