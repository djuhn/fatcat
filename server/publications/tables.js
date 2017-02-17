
// // helper for datatable
// TabularTables = {};

// FeedbackUsers = new Mongo.Collection('FeedbackUsers');

// //Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

// Places = new Mongo.Collection('Places');
// Trusts = new Mongo.Collection('Trusts');
// Hospitals = new Mongo.Collection('Hospitals');

// TabularTables.Places = new Tabular.Table({
//   name: "Places",
//   collection: Places,
//   columns: [
//     {data: "Trust", title: "Trust"},
//     {data: "Hospital", title: "Hospital"},
//     {data: "Department", title: "Department"},


//   ]
// });

// TabularTables.Trusts = new Tabular.Table({
//   name: "Trusts",
//   collection: Trusts,
//   columns: [
//     {data: "Trust", title: "Trust"},
//   ]
// });

// TabularTables.Hospitals = new Tabular.Table({
//   name: "Hospitals",
//   collection: Hospitals,
//   columns: [
//     {data: "Trust", title: "Trust"},
//     {data: "Hospital", title: "Hospital"},


//   ]
// });

// TabularTables.FeedbackUsers = new Tabular.Table({
//   name: "Feedback Users",
//   collection: FeedbackUsers,
//   columns: [
//     {data: "email", title: "Email"},
//     {data: "surname", title: "Surname"},
//     {data: "firstname", title: "Firstname"},
// /*    {data: "level", title: "Access Level",
//           render: function (val, type, doc) {
//               if (val == 10) { return "System Admin"; }
//               if (val == 9) { return "Head of School"; }
//               if (val == 8) { return "Regional Advisor"; }
//               if (val == 7) { return "Deputy Regional Advisor"; }
//               if (val == 6) { return "Training Programme Director"; }
//               if (val == 5) { return "College Tutor" }
//           }
//     },*/
//     {
//           data: "workplacestring",
//           title: "Workplaces",
// /*          render: function (val, type, doc) {
//             var x = "<span class='label label-default'>";
//             if (val instanceof Array) {
//               _.forEach(val, function(e) {
//                x = x + val;             
//               });
//               x = x + "</span>";
//                 return x;
//             } else {
//                 x = x + "Nil</span>";
//             }
//             return x
//         }*/
//       }
//   ]
// });