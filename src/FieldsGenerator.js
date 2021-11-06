import { useRef } from "react";
import { renderClassForSpan } from "./configForm";

const touchedValue = (touched,index)=>{
    if (Object.keys(touched).length === 0){
        return false;
    }
    else{
        if (touched.data[index] !== undefined){
            return true;
        }
    }
}

export const InputText = ({layout,name,index,type,placeholder,label,formik}) => {

    let touched = touchedValue(formik.touched,index);
    return ( 
        <div className={`m-1 mx-2 `+renderClassForSpan(layout)}>
            <label htmlFor={`data[${index}].value`} className="roboto block font-medium">{label}</label>
            <input 
                type={type} 
                name={`data[${index}].value`}  
                id={`data[${index}].value`} 
                placeholder={placeholder} 
                className="w-full mt-2 shadow rounded p-2 outline-none"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.data[index].value}
            />
            {   
                formik.errors[name] && touched ? 
                <div className="text-red-600 mt-2 text-sm font-semibold">{formik.errors[name]}</div> 
                : null
            }
        </div>
    );
}

export const InputCheckBox = ({layout,name,index,type,label,labelGroup,valueOption,formik})=>{
    let touched = touchedValue(formik.touched,index);
    let value = formik.values.data[index].value;

    const isChecked = (value,option)=>{
        for (let i = 0; i < value.length; i++) {
            if(value[i]===option){
                return true;
            }
        }
        return false
    }

    return(
        <div className={`m-1 mx-2 `+renderClassForSpan(layout)}>  
            <label htmlFor={`data[${index}].value`} className="roboto block font-medium mb-2">{labelGroup}</label>
            {valueOption.map((option,indexCheckBox)=>{
                return(
                    <div key={option} className="flex items-center gap-2">
                        
                        <input 
                            type={type} 
                            name={`data[${index}].value`}  
                            id={`data[${index}].value[${indexCheckBox}]`} 
                            className="h-5 w-5"
                            onChange={formik.handleChange}
                            value={option}
                            checked={isChecked(value,option)}
                        />
                        <label htmlFor={`data[${index}].value[${indexCheckBox}]`} >{label[indexCheckBox]}</label>
                    </div>
                )
            })}   
            {formik.errors[name] && touched ? <div className="text-red-600 mt-2 text-sm font-semibold">{formik.errors[name]}</div> : null}
        </div>
    )
}
 
export const InputRadio = ({layout,name,index,type,label,labelGroup,valueOption,formik})=>{
    let value = formik.values.data[index].value;
    let touched = touchedValue(formik.touched,index);
    return(
        <div className={`m-1 mx-2 `+renderClassForSpan(layout)}>  
            <label htmlFor={`data[${index}].value`} className="roboto block font-medium mb-2">{labelGroup}</label>
            {valueOption.map((option,indexRadio)=>{
                return(
                    <div key={option} className="flex items-center gap-2">
                        <input 
                            type={type} 
                            name={`data[${index}].value`}  
                            id={`data[${index}].value[${indexRadio}]`} 
                            className="h-5 w-5"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={option}
                            checked={value===option}
                        />
                        <label htmlFor={`data[${index}].value[${indexRadio}]`} >{label[indexRadio]}</label>
                    </div>
                )
            })} 
            {formik.errors[name] && touched ? <div className="text-red-600 mt-2 text-sm font-semibold">{formik.errors[name]}</div> : null}
        </div>
    )
}

export const InputSelect = ({layout,name,index,label,labelGroup,valueOption,formik})=>{
    let touched = touchedValue(formik.touched,index);
    return(
        <div className={`m-1 mx-2 `+renderClassForSpan(layout)}>  
             <label htmlFor={`data[${index}].value`} className="roboto block font-medium mb-2">{labelGroup}</label>
            <select 
                name={`data[${index}].value`} 
                id={`data[${index}].value`} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.data[index].value}
                className="w-full bg-white mt-2 shadow rounded p-2 outline-none"
            >
                <option disabled value="">Choose the region</option>
                {valueOption.map((option,indexSelect)=>{
                    return(
                        <option key={option} value={option}>
                            {label[indexSelect]}
                        </option>
                    )
                })} 
            </select>
            {formik.errors[name] && touched ? <div className="text-red-600 mt-2 text-sm font-semibold">{formik.errors[name]}</div> : null}
        </div>
    )
}

export const InputFile = ({layout,name,index,label,formik})=>{

    const file = formik.values.data[index].value;
    let touched = touchedValue(formik.touched,index);
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
        formik.setFieldValue(`data[${index}].value`,[...file,...fileSubmit]);
        await timeout(()=>{
            console.log(inputRef.current.files);
            for (let i = 0; i < fileSubmit.length; i++) {
                fileSubmit[i] = URL.createObjectURL(inputRef.current.files[i]);
            }
        })
        formik.setFieldValue(`data[${index}].value`,[...file,...fileSubmit]);
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
        <div className={`m-1 mx-2 `+renderClassForSpan(layout)}>
            <label htmlFor={`data[${index}].value`} className="roboto block font-medium">{label}</label>
            <input onChange={handleChange} type="file" hidden ref={inputRef} multiple />
            <div onClick={handleClick} onDragOver={handleDragOver} onDrop={handleDrop} className="p-5 flex items-center h-32 
                justify-center rounded mt-2 shadow-file"
            >
                DROP HERE
            </div>
            <div className="flex flex-wrap">
                {
                    file.map((file)=><img className="h-32 my-5 mx-2 rounded shadow" src={file} alt={file} />)
                }
            </div>
            {formik.errors[name] && touched ? <div className="text-red-600 mt-2 text-sm font-semibold">{formik.errors[name]}</div> : null}
        </div>
    )
}