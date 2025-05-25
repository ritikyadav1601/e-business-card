// import { useEffect, useState } from "react"
// import axios from "axios"

// function Card() {
//     const [name, setName] = useState("")
//     const [description, setDescription] = useState("")
//     const [linkedinUrl, setLinkedinUrl] = useState("")
//     const [twitterUrl, setTwitterUrl] = useState("")
//     const [interest, setInterest] = useState("")

//     const [business, setBusiness] = useState([])

//     useEffect(() => {
//        fetchUsers()
//     }, [])

//     function fetchUsers(){
//         axios.get("http://localhost:3000/user/getallusers")
//         .then(function (res) {
//             console.log("API response " + res.data)
//             setBusiness(res.data.data)
//         }).catch(err => {
//             console.error("Failed to fetch users: ", err)
//         })
//     }

//     function deleteUser(id) {
//         axios.delete(`http://localhost:3000/user/delete/${id}`)
//             .then((res) => {
//                 console.log(res.data)
//                 setBusiness(prev => prev.filter(user => user._id !== id))
//             })
//     }

//     function createUser(e){
//         e.preventDefault()
//         axios.post(`http://localhost:3000/user/create`, {name, description, linkedinUrl, twitterUrl, interest})
//         .then((res) =>{
//             console.log('User created'+ res.data)
//             fetchUsers()

//             setName("");
//             setDescription("");
//             setLinkedinUrl("");
//             setTwitterUrl("");
//             setInterest("");
//         }).catch((error) => console.error("Create user failed:", error));

//     }

//     function updateUser(id){
//         axios.put(`http://localhost:3000/user/update/${id}`, {name, description, linkedinUrl, twitterUrl, interest})
//         .then((res)=>{
//             console.log(res.data)
//         }).catch((error) => console.error("Create user failed:", error));
//     }

//     return <div>

//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: 10, margin: 5 }} />
//             <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: 10, margin: 5 }} />
//             <input type="text" placeholder="LinkedinUrl" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} style={{ padding: 10, margin: 5 }} />
//             <input type="text" placeholder="Twitter" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} style={{ padding: 10, margin: 5 }} />
//             <input type="text" placeholder="Interest" value={interest} onChange={(e) => setInterest(e.target.value)} style={{ padding: 10, margin: 5 }} />

//             <button onClick={createUser}>Add new User</button>
//         </div>


//         {business.map((user) => (
//             <div key={user._id} style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", padding: 10, margin: 20, width: 400, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 7px 0px" }}>
//                 <h4 >{user.name}</h4>
//                 <h4>{user.description}</h4>
//                 <h4>{user.interest}</h4>
//                 <button>{user.linkedinUrl}</button>
//                 <button>{user.twitterUrl}</button> <br />
//                 <button onClick={()=>deleteUser(user._id)}>Delete</button>
//                 <button onClick={()=>updateUser(user._id)}>Update</button>
//             </div>
//         ))}
//     </div>
// }

// export default Card



import { useEffect, useState } from "react";
import axios from "axios";

function Card() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [interest, setInterest] = useState("");
    const [message, setMessage] = useState("");

    const [business, setBusiness] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null); // Track if editing

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        axios.get("http://localhost:3000/user/getallusers")
            .then((res) => {
                setBusiness(res.data.data);
            })
            .catch(err => {
                console.error("Failed to fetch users: ", err);
            });
    }

    function deleteUser(id) {
        axios.delete(`http://localhost:3000/user/delete/${id}`)
            .then((res) => {
                setMessage(res.data.msg || "User deleted");
                setBusiness(prev => prev.filter(user => user._id !== id));
            })
            .catch((err) => {
                setMessage("Failed to delete user.");
            });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const payload = { name, description, linkedinUrl, twitterUrl, interest };

        if (editingUserId) {
            // Update
            axios.put(`http://localhost:3000/user/update/${editingUserId}`, payload)
                .then((res) => {
                    setMessage(res.data.msg || "User updated successfully");
                    fetchUsers();
                    clearForm();
                })
                .catch((error) => {
                    setMessage("Update failed.");
                });
        } else {
            // Create
            axios.post(`http://localhost:3000/user/create`, payload)
                .then((res) => {
                    setMessage(res.data.msg || "User created successfully");
                    fetchUsers();
                    clearForm();
                })
                .catch((error) => {
                    setMessage("Create user failed.");
                });
        }
    }

    function startEdit(user) {
        setEditingUserId(user._id);
        setName(user.name);
        setDescription(user.description);
        setLinkedinUrl(user.linkedinUrl);
        setTwitterUrl(user.twitterUrl);
        setInterest(user.interest);
    }

    function clearForm() {
        setName("");
        setDescription("");
        setLinkedinUrl("");
        setTwitterUrl("");
        setInterest("");
        setEditingUserId(null);
    }

    // Clear message after 3s
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div>
            {message && (
                <div style={{ backgroundColor: "#e0ffe0", padding: 10, margin: 10, borderRadius: 5 }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: 10, margin: 5 }} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: 10, margin: 5 }} />
                <input type="text" placeholder="LinkedinUrl" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} style={{ padding: 10, margin: 5 }} />
                <input type="text" placeholder="Twitter" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} style={{ padding: 10, margin: 5 }} />
                <input type="text" placeholder="Interest" value={interest} onChange={(e) => setInterest(e.target.value)} style={{ padding: 10, margin: 5 }} />

                <button type="submit">{editingUserId ? "Update User" : "Add New User"}</button>
                {editingUserId && <button onClick={clearForm} style={{ marginTop: 10 }}>Cancel Edit</button>}
            </form>

            {business.map((user) => (
                <div key={user._id} style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", padding: 10, margin: 20, width: 400, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 7px 0px" }}>
                    <h4>{user.name}</h4>
                    <h4>{user.description}</h4>
                    <h4>{user.interest}</h4>
                    <button>{user.linkedinUrl}</button>
                    <button>{user.twitterUrl}</button> <br />
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                    <button onClick={() => startEdit(user)}>Edit</button>
                </div>
            ))}
        </div>
    );
}

export default Card;
