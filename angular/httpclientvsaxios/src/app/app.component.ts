import { Component } from '@angular/core';
import { MyServiceService } from './my-service.service';
import { Post } from './post';
import { Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Article by Jeetendra';
  
  constructor(private httpService: MyServiceService) { }

  
posts!:Observable<Post[]>;
postId!:number
newPost!:Observable<any>;


getPosts(){
  this.posts = this.httpService.getPosts()

}

getPostById(id:number){
  return this.httpService.getPostById(id);
}

createPost(){
  const data: Post = {
    id:99,
    userId:25,
    title:"My New post",
    body:"Hello world"
  }
  this.newPost = this.httpService.createPost(data)
}

deletePost(){
 return this.httpService.deletePost()
}

editPost(){
  const body = { title: 'Angular PUT Request Example' };
  return this.httpService.editPost(body)
}
}
