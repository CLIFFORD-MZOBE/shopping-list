import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  product;
  items=[];
  list = {
    key:'',
    product:''

  }


  constructor(public navCtrl: NavController, public navParams: NavParams, ) {
  this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
  //save to database(shopping) 
  saveList(){
    this.items=[];
    this.list.product = this.product;
    var database  = firebase.database();
    database.ref('/myList/').push(this.list);
    
    
  }
  //retrieve from database(shopping)
  getData(){
    firebase.database().ref('myList').on("value", (snapshot) =>{
      snapshot.forEach((snap)=>{
        this.list.key=snap.key;
        this.items.push({product:snap.val().product, key:snap.key});
        return false;
      });
    }
    ) 

  }

update(item){
  this.list.product = this.product;
  var database  = firebase.database();
  database.ref('/myList/' + item.key).set(this.list);
  this.items=[];
  this.getData();
}
delete(item){
    this.list.product = this.product;
    var database  = firebase.database();
    database.ref('/myList/'  + item.key).remove();
    this.items=[];
    this.getData();
}

}
