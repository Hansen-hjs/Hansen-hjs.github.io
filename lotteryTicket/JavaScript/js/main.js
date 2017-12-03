require.config({
  paths: {
    "JavaScript": "module",
    "jQuery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    "qrCode": 'qrcode'
  }
});
require(['JavaScript', 'jQuery', 'qrCode'], function (){
  console.log($('#wrap'));
});
