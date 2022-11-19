import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from  '@angular/common/http';
import { Post } from './post';
import { map, take, takeLast } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(this.url + "/posts");
  }

  getPostById(id:number){
    let headers = new HttpHeaders().set("Authorization","auth-token")
    let params = new HttpParams().set("userId",id)
    return this.http.get<Post[]>(this.url + "/posts",{params,headers}).subscribe((x) =>{
      console.log(x)
    });
  }

createPost(data:any){
  return this.http.post<any>(this.url + "/posts" ,data).pipe(
    map(title => title.body)
  )
}

deletePost(){
  return this.http.delete('https://jsonplaceholder.typicode.com/posts/1')
  .subscribe((e) => console.log("delete successful"));
}


editPost(body:any){
  return this.http.put<any>('https://jsonplaceholder.typicode.com/posts/4', body)
  .subscribe(data => console.log(data));
}  


}
