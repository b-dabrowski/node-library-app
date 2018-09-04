function CategoryConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.category', {
            url: '/category/@:id',
            controller: 'CategoryCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'category/category.html',
            resolve: {
                category: function (Category, $state, $stateParams) {
                    return Category.get($stateParams.id).then(
                        (category) => category,
                        (err) => $state.go('app.home')
                    );
                }
            }
        });
};

export default CategoryConfig;