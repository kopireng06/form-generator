import React,{useState,useEffect} from 'react'
import { Formik } from 'formik'
import { config,validator } from './configForm'
import { InputCheckBox,InputText,InputRadio,InputSelect,InputFile } from './FieldsGenerator'
import {BiMenu,BiHomeCircle, BiMeh,BiCurrentLocation} from "react-icons/bi"
import { AnimateSharedLayout, motion,useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'

const Mencoba = () => {
  const [configForm,setConfigForm] = useState([])
  const [hideSidebar,setHideSidebar] = useState(false)
  const [activeLink,setActiveLink] = useState("tamu")
  const control = useAnimation()

  useEffect(()=>{
    setTimeout(()=>{
      setConfigForm(config);
    },1000)
  })

  useEffect(()=>{
    if(hideSidebar){
      control.start({
        width:"70px"
      })
    }else{
      control.start({
        width:"18rem"
      })
    }
  },[hideSidebar])

  return(
    <div className="flex items-start">
      <AnimateSharedLayout>
        <motion.div animate={control} className="h-screen w-72 shadow-xl bg-sidebar">
          <button className={`block m-2 `+(hideSidebar ? "mx-auto" : "ml-auto")} onClick={()=>setHideSidebar(!hideSidebar)}>
            <BiMenu color="white" size="40px"/>
          </button>
          <div className="flex flex-col p-4">
            <Link to="/dashboard" onClick={()=>setActiveLink("dashboard")} className="flex items-center p-2 relative">
              <BiHomeCircle color="white" size="22px"/>
              <span 
                className={`text-white nunito font-semibold mx-2 `+(hideSidebar ? "hidden" : "inline")}
              >
                Dashboard
              </span>
              {activeLink === "dashboard" ? <motion.div layoutId="active-link" className="bg-white opacity-25 left-0 h-full rounded absolute w-full"></motion.div> : null}
            </Link>
            <Link to="/tamu" onClick={()=>setActiveLink("tamu")} className="flex items-center p-2 relative">
              <BiMeh color="white" size="22px"/>
              <span 
                className={`text-white nunito font-semibold mx-2 `+(hideSidebar ? "hidden" : "inline")}
              >
                Tamu undangan
              </span>
              {activeLink === "tamu" ? <motion.div layoutId="active-link" className="bg-white opacity-25 left-0 h-full rounded absolute w-full"></motion.div> : null}
            </Link>
            <Link to="/lokasi" onClick={()=>setActiveLink("lokasi")} className="flex items-center p-2 relative">
              <BiCurrentLocation color="white" size="22px"/>
              <span 
                className={`text-white nunito font-semibold mx-2 `+(hideSidebar ? "hidden" : "inline")}
              >
                Peta lokasi
              </span>
              {activeLink === "lokasi" ? <motion.div layoutId="active-link" className="bg-white opacity-25 left-0 h-full rounded absolute w-full"></motion.div> : null}
            </Link>
          </div>
        </motion.div>
      </AnimateSharedLayout>
      <Formik 
        initialValues = {{
          data: config
        }}
        validate = {(form)=>validator(form.data)}
        onSubmit = {(form)=> {console.log(form.data)}}
      >
        {
          (formik) =>(
            <form encType="multipart/form-data" onSubmit={formik.handleSubmit} className="flex-1 grid grid-cols-12 p-10">
              {
                configForm.map((config,index)=>{
                  let {tag,type,name} = config;
                  switch(tag){
                    case "input":
                      switch(type){
                        case "text":
                        case "password":
                        case "email":
                          return (
                            <InputText key={name} {...config} index={index} formik={formik} />
                          )
                        case "checkbox":
                          return(
                            <InputCheckBox key={name} {...config} index={index} formik={formik} />
                          )
                        case "radio":
                          return(
                            <InputRadio key={name} {...config} index={index} formik={formik} />
                          )
                        case "file":
                          return(
                            <InputFile key={name} {...config} index={index} formik={formik}/>
                          )
                        default:
                          return null
                      }
                    case "select":
                      return(
                        <InputSelect key={name} {...config} index={index} formik={formik}/>
                      )
                    default:
                        return null
                  }
                })
              }
              <input type="submit" className="col-span-12 shadow-sm rounded p-2 m-2 text-white bg-blue-500"/>
            </form>
          )
        }
      </Formik>
    </div>
  )

}

export default Mencoba;