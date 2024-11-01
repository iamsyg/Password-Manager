import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      let pass = JSON.parse(localStorage.getItem("passwords"));
      setPasswordArray(pass);
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eye.svg")) {
      ref.current.src = "icons/eye-crossed.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eye.svg";
      passwordRef.current.type = "text";
    }
  };

  const copyText = (text) => {
    toast("Copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    console.log(form);
    setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
    console.log([...passwordArray, form]);
  };


  const deletePassword = (id) => {

    let c=confirm("Delete password?")
    if(c)
    {
        let newPassword=passwordArray.filter(item=>{
            return item.id!==id;
          });
      
          setPasswordArray(newPassword);
          localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }
    
  }

  const editPassword =(id) => {
    let t=passwordArray.filter(i=>i.id===id)
    setform(t[0]);
    let newPass=passwordArray.filter(item=>{
        return item.id!==id;
      });
  
      setPasswordArray(newPass);
  }
  

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="  mycontainer">
        <h1 className="text-center font-bold text-4xl">Enter Credentials</h1>
        <div className="flex text-black flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id=""
              />
              <span
                className="absolute top-[4px] right-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} width={25} src="icons/eye.svg" alt="eye" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="py-2 px-2 flex justify-center items-center bg-green-500 rounded-full w-fit hover:bg-green-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add password
          </button>
        </div>
        <div className="passwords">
          <h1 className="text-xl font-bold py-4">Your passwords</h1>
          {passwordArray.length === 0 && <div>No passwords</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden">
              <thead className="text-white bg-green-500">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="lordiconcopy  text-center  py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="lordiconcopy  text-center py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="lordiconcopy text-center  py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center text-center  py-2 border border-white">
                        <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/swcqkzdc.json"
                            trigger="hover"
                            style={{"width":"25px", "height":"25px"}}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            style={{"width":"25px", "height":"25px"}}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
