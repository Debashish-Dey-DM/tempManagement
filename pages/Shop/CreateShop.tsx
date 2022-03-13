import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateShop = () => {
    const [newId,setNewId] = useState<string|undefined>();
    const mount =async () => {
        const res = await axios.get("http://localhost:3000/api/shop/GetNewShopId");
        setNewId(res.data);
    }
    useEffect(() => {
        mount();
    }, []);
    const submitData = async (e: any) => { 
        e.preventDefault();
        const rate = e.target?.[2]?.value;
         const res = await axios.post("http://localhost:3000/api/shop/createShop", { rate })
         console.log(res.data);
        
    }
    return (
        <div>
            <form onSubmit={submitData} className="pt-4">
                <fieldset disabled>
                    <label >ID</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={newId}/>
                </fieldset>
                <div className="form-group">
                    <label >Rate Per Month</label>
                    <input type="text" className="form-control"  placeholder=""/>
                </div>
                <br />
                <button type="submit" className="btn btn-primary ">Submit</button>
            </form>
        </div>
    )
}
export default CreateShop;