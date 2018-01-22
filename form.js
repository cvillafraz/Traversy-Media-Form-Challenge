window.onload=()=>{
    //variables
    const allInputs=document.querySelectorAll('input');
    const gInputs = document.querySelectorAll('#general input');
    const ctnInfInputs = document.querySelectorAll('.contact-info>input');
    const btn = document.querySelectorAll('.contact-info button');
    const clearBtn = document.querySelector('#clear');
    const saveBtn = document.querySelector('#save');
    const submitBtn = document.querySelector('button[type="submit"]');
    let form = {
        firstName:'',
        lastName:'',
        date:'',
        email:[],
        phoneNumber:[],
        address:[]
    };
    //events
    //inserting general-info into the form object
    gInputs.forEach(input=>{
        input.addEventListener('input',e=>{
            switch (e.target.getAttribute('name')) {
                case "f-name":
                    form.firstName=e.target.value;
                    break;
                case "l-name":
                    form.lastName=e.target.value;
                    break;
                case "date":
                    form.date=e.target.value;
                    break;
            }
        })
    });
    //inserting contact-info into the form object
    ctnInfInputs.forEach(element => {
        element.addEventListener('keyup',e=>{
            switch (element.getAttribute('name')) {
                case "email":
                    form.email.splice(form.email.indexOf(e.target.value));
                    form.email.push(e.target.value);
                    break;
                case "phone":
                    form.phoneNumber.splice(form.phoneNumber.indexOf(e.target.value));
                    form.phoneNumber.push(e.target.value);
                    break;
                case "address":
                    form.address.splice(form.address.indexOf(e.target.value));
                    form.address.push(e.target.value);
                    break;
            }
        })
    });
    
    //adding more than 1 email/phone/address

    btn.forEach(val=>{
        val.addEventListener('click',e=>{
            e.preventDefault();
            e.stopPropagation();
            //inserting new inputs into the document
            let cont=document.createElement('div');
            let c=document.createElement('input');
            let del=document.createElement('span');
            cont.classList.add('new');
            c.value=val.parentElement.firstElementChild.nextElementSibling.value;
            del.textContent="Delete";
            del.classList.add('delete');
            cont.appendChild(c);
            cont.appendChild(del);
            val.parentNode.insertBefore(cont,val);
            //inserting new values into the form object
            if(e.target==btn[0]){
                btn[0].previousElementSibling.firstElementChild.setAttribute('type','email');  
            }
            if(e.target==btn[1]){
                btn[1].previousElementSibling.firstElementChild.setAttribute('type', 'tel'); 
            }
            if(e.target==btn[2]){
                btn[2].previousElementSibling.firstElementChild.setAttribute('type', 'text');
            }
            form.email.push(btn[0].parentElement.firstElementChild.nextElementSibling.value);
            form.phoneNumber.push(btn[1].parentElement.firstElementChild.nextElementSibling.value);
            form.address.push(btn[2].parentElement.firstElementChild.nextElementSibling.value);
           
            
           //delete inserted inputs
            let span = document.querySelectorAll('.delete');
            span.forEach(i => {
                i.addEventListener('click', e => {
                    const p=e.target.parentElement;
                    p.parentNode.removeChild(p);
                    
                    if(e.target.previousElementSibling.getAttribute('type')=='email'){
                        form.email.splice(email.indexOf(e.target.previousElementSibling.value));
                        form.email=[email];
                    }
                    if (e.target.previousElementSibling.getAttribute('type') == 'tel') {
                        form.tel.splice(email.indexOf(e.target.previousElementSibling.value));
                        form.phoneNumber = [phone];
                    }
                    if (e.target.previousElementSibling.getAttribute('type') == 'email') {
                        form.email.splice(email.indexOf(e.target.previousElementSibling.value));
                        form.address = [address];
                    }
                })
            });
           
        })
    }
    );
    //clear all inputs
    clearBtn.addEventListener('click',e=>{
        e.preventDefault();
        e.stopPropagation();
        allInputs.forEach(inp=>{
            inp.value="";
        });
    })
   //save all info in local storage
   
   saveBtn.addEventListener('click',e=>{

       if(localStorage.getItem('form')===null){
            let formx=[];
            formx.push(form);
            localStorage.setItem('Customer info',JSON.stringify(formx));
       }else{
           let formx=JSON.parse(localStorage.getItem('Customer info'));
           formx.push(form);
           localStorage.setItem('Customer info',JSON.stringify(formx));
       }
   })
   //show info as JSON
   submitBtn.addEventListener('click',e=>{
       alert(JSON.stringify(form));
   })
};