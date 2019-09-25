import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { map } from 'rxjs/operators/map';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }
  private token: string;


  login(user){
    
    let base = this.http.post(
      "http://localhost:3000/authenticate",user,httpOptions);
   
    const request = base.pipe(
      map((data) => {
        if (data) {
         
          console.log(data['token'],"skjgskj",data)
          this.saveToken(data['token']);
        }
        return data;
      })
    );
  
    return request;



  }

private saveToken(token: string): void {
  localStorage.setItem('mean-token', token);
  this.token = token;
}

private getToken(): string {
  if (!this.token) {
    this.token = localStorage.getItem('mean-token');
  }
  return this.token;
}

public logout(): void {
  this.token = '';
  window.localStorage.removeItem('mean-token');
  this.router.navigateByUrl('/');
}


public getUserDetails() {
  const token = this.getToken();
  let payload;
  if (token) {
    payload = token.split('.')[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  } else {
    return null;
  }
}
public isLoggedIn(): boolean {
  const user = this.getUserDetails();
  if (user) {
    return user.exp > Date.now() / 1000;
  } else {
    return false;
  }
}






adduser(){
    
  let base = this.http.get( "http://localhost:3000/adduser",{ headers: { Authorization: this.getToken() }});
 
  const request = base.pipe(
    map((data) => {
      if (data['token']) {
        this.saveToken(data['token']);
      }
      return data;
    })
  );

  return request;



}

addnewuser(data){
  console.log(data);
  return this.http.post("http://localhost:3000/adduser",data,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
 
}

edituser(data,id){
  console.log(data,"api");
  
  return this.http.post("http://localhost:3000/adduser/"+id,data,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
}



deleteuser(id){
 
  return this.http.delete("http://localhost:3000/adduser/"+id,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
}






getAlleave(){
  let base = this.http.get( "http://localhost:3000/leavetable/leavetable",{ headers: { Authorization: this.getToken() }});
  console.log(base);
   const request = base.pipe(
    map((data) => {
      if (data['token']) {
        this.saveToken(data['token']);
      }
      return data;
    })
  );
  return request;
}

addnewleave(data){
  console.log(data);
  return this.http.post("http://localhost:3000/leavetable/leavetable",data,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
 
}

editleave(data,id){
  console.log(data);
  
  return this.http.post("http://localhost:3000/leavetable/leavetable/"+id,data,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
}



deleteleave(id){
 
  return this.http.delete("http://localhost:3000/leavetable/leavetable/"+id,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
}




getAllHolidays(){
  let base = this.http.get( "http://localhost:3000/holiday/holiday",{ headers: { Authorization: this.getToken() }});
  console.log(base);
   const request = base.pipe(
    map((data) => {
      if (data['token']) {
        this.saveToken(data['token']);
      }
      return data;
    })
  );
  return request;
}

addnewHoliday(data){
  console.log(data);
  return this.http.post("http://localhost:3000/holiday/holiday",data,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
 
}

editHoliday(data,id){
  console.log(data);
  
  return this.http.post("http://localhost:3000/holiday/holiday/"+id,data,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
}



deleteHoliday(id){
 
  return this.http.delete("http://localhost:3000/holiday/holiday/"+id,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } })
}



getAllRequest(){
  let base = this.http.get( "http://localhost:3000/LRequest/LRequest",{ headers: { Authorization: this.getToken() }});
  console.log(base);
   const request = base.pipe(
    map((data) => {
      if (data['token']) {
        this.saveToken(data['token']);
      }
      return data;
    })
  );
  return request;
}

getAllRequeststatus(data,id){
  console.log('getAllRequeststatus', id,data)
  return this.http.post("http://localhost:3000/LRequest/update/"+id,{status: data},{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } });

}





 getuserRequest(){
   var abc=this.getUserDetails()._id;
   console.log(abc)
    return this.http.get("http://localhost:3000/LRequest/LRequest/"+abc,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } });
 }



 applyleave(data){
   console.log(data,"apply")
   return this.http.post("http://localhost:3000/LRequest/LRequest",data,{ headers: { Authorization: `${this.getToken()}`,'Content-Type': 'application/json' } });
 }


 forgot(email){
   console.log(email)
  return this.http.post("http://localhost:3000/forgot",{email},httpOptions);
 




 }
 reset(token){
   console.log(token)
   return this.http.post("http://localhost:3000/reset",{token},httpOptions);
  }
resetpwd(password,token){
  
  return this.http.post("http://localhost:3000/resetpwd",{token,password},httpOptions);
}

}
