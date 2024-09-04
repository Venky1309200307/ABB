import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateItem(){
    const [image,setImage]=useState()
    const [status,setStatus]=useState()
    const [name,setName]=useState()
    const [minbid,setMinbid]=useState()
    const [currentbid,setCurrentbid]=useState()
    const [endsin,setEndsin]=useState()
    const [seller,setSeller]=useState()
    const navigate=useNavigate()

    const Submit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/createUser",{image,status,name,minbid,currentbid,endsin,seller})
        .then(result=>{
            console.log(result)
            navigate('/auction')
        })
        .catch(err=>{console.log(err)})
    }
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add Item</h2>
                    <div className="mb-2">
                        <label htmlFor="">Image URL</label>
                        <input type="text" placeholder="Enter Image URL" className="form-control"
                        onChange={(e)=>setImage(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Status</label>
                        <input type="text" placeholder="Enter Status" className="form-control"
                        onChange={(e)=>setStatus(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                        onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Minbid</label>
                        <input type="text" placeholder="Enter minbid" className="form-control"
                        onChange={(e)=>setMinbid(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Currentbid</label>
                        <input type="text" placeholder="Enter currentbid" className="form-control"
                        onChange={(e)=>setCurrentbid(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Ends In</label>
                        <input type="text" placeholder="Enter End Date" className="form-control"
                        onChange={(e)=>setEndsin(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Seller</label>
                        <input type="text" placeholder="Enter Seller" className="form-control"
                        onChange={(e)=>setSeller(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateItem;