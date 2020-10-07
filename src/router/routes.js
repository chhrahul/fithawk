const routes = [
 {
  path: "/",
  component: () => import("layouts/Basic.vue"),
  children: [
   {
    name: "Welcome",
    path: "/",
    component: () => import("pages/welcome/WelcomeScreen.vue")
   },
   // AUTH PAGES
   {
    name: "Auth",
    path: "/auth",
    component: () => import("pages/auth/Auth.vue")
   },
   {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: () => import("pages/auth/ForgotPassword.vue")
   },
   {
    name: "Signup",
    path: "/signup",
    component: () => import("pages/auth/Signup.vue")
   }
   //END AUTH PAGES
  ]
 },
 {
  path: "/",
  component: () => import("layouts/MainLayout.vue"),
  children: [
   {
    name: "HomeFeed",
    path: "/home",
    component: () => import("pages/main/home/HomeFeed.vue")
   },
   {
    name: "Search",
    path: "/search",
    component: () => import("pages/main/search/Search.vue")
   },
   {
    name: "Notification",
    path: "/notifications",
    component: () => import("pages/main/notifications/Notifications.vue")
   },
   {
    name: "Profile",
    path: "/profile/:id",
    component: () => import("pages/main/profile/profile/Profile.vue")
   }
  ]
 },
 {
  path: "/",
  component: () => import("layouts/SecondaryLayout.vue"),
  children: [
   {
    name: "CreateEvent",
    path: "/create-event",
    component: () => import("pages/main/create/CreateEvent.vue")
   },
   {
    name: "InviteUser",
    path: "/invite-users",
    component: () => import("pages/main/invite/InviteUser.vue")
   },
   {
    name: "Event Detail",
    path: "/event/:id",
    component: () => import("pages/main/events/event/Event.vue")
   },
   {
    name: "EditPost",
    path: "/edit-post/:id",
    component: () => import("pages/main/edit/EditPost.vue")
   },
   {
    name: "Group",
    path: "/group/:id",
    component: () => import("pages/main/groups/Groupprofile.vue")
   },
   {
    name: "Edit Group",
    path: "/edit-group/:id",
    component: () => import("pages/main/groups/EditGroupProfile.vue")
   },
   {
    name: "Edit Group",
    path: "/edit-group/:id",
    component: () => import("pages/main/groups/EditGroupProfile.vue")
   },
   {
    name: "Events",
    path: "/events",
    component: () => import("pages/main/events/ListEvents.vue")
   },
   {
    name: "CreatePost",
    path: "/create-post",
    component: () => import("pages/main/create/CreatePost.vue")
   },
   {
    name: "Messages",
    path: "/messages",
    component: () => import("pages/main/messages/MessageList.vue")
   },
   {
    name: "PostDetail",
    path: "/detail-post/:id",
    component: () => import("pages/main/post/index.vue")
   },
   {
    name: "Group Members",
    path: "/allgroupmembers/:id",
    component: () => import("pages/main/groups/GroupMembers.vue")
   },
   {
    name: "Post Detail",
    path: "/post/:id",
    component: () => import("pages/main/posts/post/PostDetail.vue")
   },
   {
    name: "All Media",
    path: "/seeallmedia/:id",
    component: () => import("pages/main/profile/profile/AllMedia.vue")
   },
   {
    name: "EditProfile",
    path: "/edit-profile/:id",
    component: () => import("pages/main/profile/editProfile/EditProfile.vue")
   },
   {
    name: "CreateEvent",
    path: "/create-event",
    component: () => import("pages/main/create/CreateEvent.vue")
   },
   {
    name: "InviteUser",
    path: "/invite-users",
    component: () => import("pages/main/invite/InviteUser.vue")
   },
   {
    name: "MyGroups",
    path: "/my-groups",
    component: () => import("pages/main/groups/GroupList.vue")
   },
   {
    name: "CreateGroup",
    path: "/create-group",
    component: () => import("pages/main/create/CreateGroup.vue")
   },
   {
    name: "JoinGroups",
    path: "/join-group",
    component: () => import("pages/main/groups/JoinGroup.vue")
   },
   {
    name: "Settings",
    path: "/settings",
    component: () => import("pages/main/settings/Settings.vue")
   }
  ]
 },
 {
    path: "/",
    component: () => import("layouts/MessagesLayout.vue"),
    children: [
        {
            name: "Chat",
            path: "/messages/chat/:channelId",
            component: () => import("pages/main/chat/Chat.vue")
        },
    ]
}
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
    routes.push({
        path: "*",
        component: () => import("pages/Error404.vue")
    });
}

export default routes;
