class CategoryCtrl {
    constructor(category) {
      'ngInject';
  
      this.category = category;
      this.listConfig = {
        type: 'category'
      };
  
      this.listConfig.filters = {category: this.category._id};
    }    
  }
  
  export default CategoryCtrl;