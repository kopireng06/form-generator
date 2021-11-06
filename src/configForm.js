export const config = [
    {
      tag:"input",
      name: "username",
      id: "username",
      type: "text",
      label: "username",
      placeholder: "your username",
      value: "keong",
      layout:{
        base:12,
        md:4
      },
      settings: [
        {
          name: "required",
          value: true,
          message: "butuh bos",
        },
        {
          name: "max",
          value: 10,
          message: "kebanyakan"
        },
        {
          name: "min",
          value: 5,
          message: "kedikitan"
        }
      ]
    },
    {
      tag:"input",
      name: "password",
      id: "password",
      type: "password",
      label: "password",
      placeholder: "your password",
      value: "kaskasjk",
      layout:{
        base:12,
        md:4
      },
      settings: [
        {
          name: "required",
          value: true,
          message: "butuh bos",
        },
        {
          name: "max",
          value: 10,
          message: "kebanyakan"
        },
        {
          name: "min",
          value: 5,
          message: "kedikitan"
        }
      ]
    },
    {
      tag:"input",
      name: "email",
      id: "email",
      type: "email",
      label: "email",
      placeholder: "your email",
      value: "",
      layout:{
        base:12,
        md:4
      },
      settings: [
        {
          name: "pattern",
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "email jo",
        }
      ]
    },
    {
        tag:"input",
        name: "mata kuliah",
        id: "mata kuliah",
        labelGroup:"mata kuliah",
        type: "checkbox",
        label: ["mtk","biologi","fisika"],
        valueOption: ["mtk","biologi","fisika"],
        value: ["biologi"],
        layout:{
          base:12,
          md:2
        },
        settings: [
          {
            name: "min",
            value: 2,
            message: "kedikitan"
          }
        ]
      },
      {
          tag:"input",
          name: "kelas",
          id: "kelas",
          labelGroup:"kelas",
          type: "radio",
          label: ["pagi","siang","sore"],
          valueOption:["pagi","siang","sore"],
          value: "siang",
          layout:{
            base:12,
            md:2
          },
          settings: [
            {
              name: "required",
              value: true,
              message: "isien bos"
            }
          ]
        },
      {
          tag:"select",
          name: "kota",
          id: "kota",
          labelGroup:"kota",
          label: ["sidoarjo","surabaya","bali"],
          valueOption:["sidoarjo","surabaya","bali"],
          value: "",
          layout:{
            base:12,
            md:8
          },
          settings: [
            {
              name: "required",
              value: true,
              message: "isien bos"
            }
          ]
        },
        {
          tag:"input",
          name: "image",
          id: "image",
          type: "file",
          label: "image",
          placeholder: "your image",
          value: [],
          layout:{
            base:12,
          },
          settings: [
            {
              name: "required",
              value: true,
              message: "butuh bos",
            }
          ]
        }
  ]

export const validator = (data)=>{

    const errors = {};
  
    const validatorObject = {
        settings:[],
        position:0,
        validatorNext:function(valueInput){
          if(this.position === this.settings.length-1){
            return null
          }
          else{
              this.position++
              let validatorName = this.settings[this.position].name;
              let messageError = this.settings[this.position].message;
              let valueValidator = this.settings[this.position].value;
              return validatorObject[validatorName](valueInput,messageError,valueValidator);
          }
        },
        required:function(valueInput,messageError,valueValidator){
            if(valueInput.length === 0){
                return messageError;
            }
            else{
                return this.validatorNext(valueInput);
            }
        },
        max:function(valueInput,messageError,valueValidator){
            if(valueInput.length > valueValidator){
                return messageError;
            }
            else{
                return this.validatorNext(valueInput);
            }
        },
        min:function(valueInput,messageError,valueValidator){
            if(valueInput.length < valueValidator){
                return messageError;
            }
            else{
                return this.validatorNext(valueInput);
            }
        },
        pattern:function(valueInput,messageError,valueValidator){
          if(valueValidator.test(valueInput.toLowerCase()) === false){
              return messageError;
          }
          else{
              return this.validatorNext(valueInput);
          }
      },
    }
  
    data.forEach(({settings,value,name})=>{
        validatorObject.settings = settings;
        validatorObject.position = 0;
        let messageError = validatorObject[settings[0].name](value,settings[0].message,settings[0].value);
        if( messageError !== null){
          errors[name] = messageError;
        }
    })
  
    return errors;
}

export const renderClassForSpan = (layout)=>{
    const listClassForSpan =[];
    for (let key in layout){
        if(key==="base"){
            listClassForSpan.push(`col-span-${layout[key]}`);
        }
        else{
            listClassForSpan.push(`${key}:col-span-${layout[key]}`);
        }
    }
    return listClassForSpan.join(" ");
}