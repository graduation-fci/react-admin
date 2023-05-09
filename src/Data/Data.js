import{
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
  UilMoneyWithdrawal,
  UilUsdSquare,
  

}from '@iconscout/react-unicons';


//sidebar Data
export const SidebarData=[
  {
    icon:UilEstate,
    heading:'Dashboard',
  },
  {
    icon:UilClipboardAlt,
    heading:'Orders'
  },
  {
    icon:UilUsersAlt,
    heading:'Customers',
    
  },
  {
    icon:UilPackage,
    heading:'Products',

  },
  {
    icon:UilChart,
    heading:'Analytics',
  },
];
export const CardsData=[
  {
    title:"sales",
    color:{
      backGround:"linear-gradient(180deg,#bb67ff 0%,#c484f3 100%)",
      boxShadow:'0px 10px 20px 0px #E0C6F5 '
    },
    barValue:70,
    value:"25,970",
    png:UilUsdSquare,
  
  series:[
    {
    name:'sales',
    data:[31,40,28,51,42,109,100]
    },
  
  ],
},
{
  title:"Revenu",
  color:{
    backGround:"linear-gradient(180deg,#FF919D 0%,#FC929D 100%)",
    boxShadow:'0px 10px 20px 0px #FDC0C7'
  },
  barValue:80,
  value:"14,270",
  png:UilMoneyWithdrawal,

series:[
  {
  name:'Revenue',
  data:[10,100,50,70,80,30,40]
  },

],
},
{
  title:"Expenses",
  color:{
    backGround:
    "linear-gradient(rgb (284,212,154)-146.42%, rgb(255,202,113)-46.42%)",
    boxShadow:'0px 10px 20px 0px #F9D59B'
  },
  barValue:60,
  value:"4,270",
  png:UilClipboardAlt,

series:[
  {
  name:'Expenses',
  data:[10,25,15,30,12,15,20]
  },

],
},
]