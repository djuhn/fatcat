/*
 * Routes: Authenticated
 * Routes that are only visible to authenticated users.
 */

Router.route('index', {
    path: '/',
    template: 'index',
    subscriptions: function() {
        return Meteor.subscribe('examplePublication');
    },
    onBeforeAction: function() {
        // Code to run before route goes here.
        Session.set('li', 'ov');
        this.next();
    }
});

Router.route('changepw', {
    path: '/changepw',
    template: 'changepw',
});

Router.route('users', {
    path: '/users',
    template: 'users',
    subscriptions: function() {
        return Meteor.subscribe('examplePublication');
    },
    onBeforeAction: function() {
        Session.set('li', 'us');
        this.next();
    }
});
Router.route('workplaces', {
    path: '/workplaces',
    template: 'workplaces',
    subscriptions: function() {
        return Meteor.subscribe('examplePublication');
    },
    onBeforeAction: function() {
        // Code to run before route goes here.
        Session.set('li', 'wo');
        this.next();
    }
});
Router.route('trainees', {
    path: '/trainees',
    template: 'trainees',
    subscriptions: function() {
        return Meteor.subscribe('examplePublication');
    },
    onBeforeAction: function() {
        // Code to run before route goes here.
        Session.set('li', 'ry');
        this.next();
    }
});
Router.route('hospitals', {
    path: '/hospitals',
    template: 'hospitals',
    subscriptions: function() {
        return Meteor.subscribe('examplePublication');
    },
    onBeforeAction: function() {
        // Code to run before route goes here.
        Session.set('li', 'ho');
        this.next();
    }
});
Router.route('feedback', {
    path: '/feedback',
    template: 'feedback',
    subscriptions: function() {
        return Meteor.subscribe('examplePublication');
    },
    onBeforeAction: function() {
        // Code to run before route goes here.
        Session.set('li', 'pe');
        this.next();
    }
});
