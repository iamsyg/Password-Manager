import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Manager = () => {
  const ref = useRef();
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
    if (ref.current.src.includes("icons/eye.svg")) {
      ref.current.src = "icons/eye-crossed.svg";
    } else {
      ref.current.src = "icons/eye.svg";
    }
  };

  const savePassword = () => {
    console.log(form);
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
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
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="text"
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
          {passwordArray.length===0 && <div>No passwords</div>}
          {passwordArray.length!==0 &&
          <table className="table-auto w-full rounded-xl overflow-hidden">
            <thead className="text-white bg-green-500">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
              </tr>
            </thead>
            <tbody className="">
                {passwordArray.map((item, index)=>{
                    return <tr key={index}>
                <td className="text-center w-32 py-2 border border-white"><a href={item.site} target="_blank">{item.site}</a></td>
                <td className="text-center w-32 py-2 border border-white">{item.username}</td>
                <td className="text-center w-32 py-2 border border-white">{item.password}</td>
              </tr>
            })}
              
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Manager;