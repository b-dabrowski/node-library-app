 class FollowBtnCtrl {
     constructor(Author, User, $state) {
         'ngInject';

         this._Author = Author;
         this._User = User;

         this._$state = $state;
     }
     submit() {
         this.isSubmitting = true;

         if (!this._User.current) {
             this._$state.go('app.register');
             return;
         }
         
         if (this.author.isUserFollowing) {
             this._Author.unfollow(this.author._id).then(
                 () => {
                     this.isSubmitting = false;
                     this.author.isUserFollowing = false;
                 }
             )
             
         } else {
             this._Author.follow(this.author._id).then(
                 () => {
                     this.isSubmitting = false;
                     this.author.isUserFollowing = true;
                 }
             )
         }
     }
 }

 let FollowBtn = {
     bindings: {
         author: '='
     },
     controller: FollowBtnCtrl,
     templateUrl: 'components/buttons/follow-btn.html'
 };

 export default FollowBtn;