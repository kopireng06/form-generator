import React, { useRef, useState } from "react";

const InputFiles = ({layout,name,index,type,placeholder,label,formik})=>{

    const [file,setFile] = useState([]);
    const inputRef = useRef(null);

    const handleDrop = (e)=>{
        e.preventDefault();
        handleChange(e,"drag");
    }

    const handleDragOver = (e)=>{
        e.preventDefault();
    }

    const handleClick = ()=>{
        inputRef.current.click();
    }

    const handleChange = async (e,byEvent="click")=>{
        let middle = byEvent === "click" ? "target" : "dataTransfer"
        inputRef.current.files = e[middle].files;
        let fileSubmit = new Array(e[middle].files.length).fill(null);
        setFile([...file,...fileSubmit]);
        await timeout(()=>{
            for (let i = 0; i < fileSubmit.length; i++) {
                fileSubmit[i] = URL.createObjectURL(inputRef.current.files[i]);
            }
        })
        setFile([...file,...fileSubmit]);
    }

    const timeout = (fc)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                fc();
                resolve();
            },2000);
        });
    }

    return(
        // <div className={`m-1 mx-2 `+renderClassForSpan(layout)}>
        //     <input onChange={handleChange} type="file" hidden ref={inputRef} multiple />
        //     <input type="text" hidden />
        //     <div onClick={handleClick} onDragOver={handleDragOver} onDrop={handleDrop} className="p-5 flex items-center h-32 
        //         justify-center rounded shadow m-10"
        //     >
        //         DROP HERE
        //     </div>
        //     {
        //         file.map((file)=><img className="h-32" src={file} alt={file} />)
        //     }
        // </div>
        null
    )
}

export default InputFiles;