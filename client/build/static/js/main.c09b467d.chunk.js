(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{167:function(e,t,a){"use strict";a.r(t);var A=a(0),n=a.n(A),r=a(14),c=a.n(r),o=(a(75),a(38)),l=a.n(o),i=a(61),u=a(15),s=a(16),w=a(18),d=a(17),g=a(19),m=a(170),E=a(171),p=a(66),h=a(172),C=a(62),B=a.n(C),v=function(e){function t(){return Object(u.a)(this,t),Object(w.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.isAuthenticated?n.a.createElement(m.a,{className:"justify-content-between",bg:"dark",variant:"dark"},n.a.createElement("button",{onClick:this.props.logout,className:"button"},"Log out"),n.a.createElement(E.a,{inline:!0,onSubmit:this.props.searchHashtag},n.a.createElement(p.a,{type:"text",placeholder:"Search",className:"mr-sm-2",name:"query"}),n.a.createElement(h.a,{type:"submit",variant:"outline-light"},"Search"))):n.a.createElement(m.a,{bg:"dark",variant:"dark"},n.a.createElement(B.a,{loginUrl:"https://webdevelopment.mybluemix.net/api/v1/auth/twitter",onFailure:this.props.onFailed,onSuccess:this.props.onSuccess,requestTokenUrl:"https://webdevelopment.mybluemix.net/api/v1/auth/twitter/reverse"}));return n.a.createElement("div",null,e)}}]),t}(A.Component),f=a(30),U=function(e){function t(){return Object(u.a)(this,t),Object(w.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(s.a)(t,[{key:"getMarkerToned",value:function(e){switch(this.getMajorTone(e).tone_id){case"anger":return a(45);case"fear":return a(46);case"joy":return a(47);case"sadness":return a(48);case"analytical":return a(49);case"confident":return a(50);case"tentative":return a(51);default:return a(52)}}},{key:"getMajorTone",value:function(e){var t={};return e.length>0&&(t=e.reduce(function(t,a){return e[t]>e[a]?t:a})),t}},{key:"render",value:function(){var e=this,t=this.props.tweets;return n.a.createElement(f.Map,{google:this.props.google,zoom:3,initialCenter:{lat:-22.1276,lng:-51.3856}},t.map(function(t){return n.a.createElement(f.Marker,{key:t.id,position:t.coordinates,icon:{url:e.getMarkerToned(t.tone)}})}))}}]),t}(A.Component),T=Object(f.GoogleApiWrapper)({apiKey:"AIzaSyC1Ptx1JeOiTABVVnuMX7cW7MAvK136tT4"})(U),O=a(168),S=a(67),J=a(169),b=function(){return n.a.createElement(m.a,{bg:"dark",variant:"dark",fixed:"bottom"},n.a.createElement(O.a,null,n.a.createElement(S.a,null,n.a.createElement(J.a,{src:a(45),roundedCircle:!0}),n.a.createElement(m.a.Text,null,"Anger")),n.a.createElement(S.a,null,n.a.createElement(J.a,{src:a(46),roundedCircle:!0}),n.a.createElement(m.a.Text,null,"Fear")),n.a.createElement(S.a,null,n.a.createElement(J.a,{src:a(47),roundedCircle:!0}),n.a.createElement(m.a.Text,null,"Joy")),n.a.createElement(S.a,null,n.a.createElement(J.a,{src:a(48),roundedCircle:!0}),n.a.createElement(m.a.Text,null,"Sadness")),n.a.createElement(S.a,null,n.a.createElement(J.a,{src:a(49),roundedCircle:!0}),n.a.createElement(m.a.Text,null,"Analytical")),n.a.createElement(S.a,null,n.a.createElement(J.a,{src:a(50),roundedCircle:!0}),n.a.createElement(m.a.Text,null,"Confident")),n.a.createElement(S.a,null,n.a.createElement(J.a,{src:a(51),roundedCircle:!0}),n.a.createElement(m.a.Text,null,"Tentative")),n.a.createElement(S.a,null,n.a.createElement(J.a,{src:a(52),roundedCircle:!0}),n.a.createElement(m.a.Text,null,"Undefined"))))},L=a(68),k=Object(L.create)({baseURL:"https://webdevelopment.mybluemix.net/api/v1"}),z=function(e){function t(){var e,a;Object(u.a)(this,t);for(var A=arguments.length,n=new Array(A),r=0;r<A;r++)n[r]=arguments[r];return(a=Object(w.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(n)))).state={isAuthenticated:!1,user:null,token:"",tweets:[]},a.onSuccess=function(e){var t=e.headers.get("x-auth-token");e.json().then(function(e){t&&a.setState({isAuthenticated:!0,user:e,token:t})})},a.onFailed=function(e){alert(e)},a.logout=function(){a.setState({isAuthenticated:!1,token:"",user:null,tweets:[]})},a.searchHashtag=function(){var e=Object(i.a)(l.a.mark(function e(t){var A,n,r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return void 0!==t&&t.preventDefault(),A=t.currentTarget.elements.query.value,e.next=4,k.post("/search/hashtag",{q:A,count:100});case 4:return n=e.sent,e.next=7,n.data;case 7:r=e.sent,a.setState({tweets:r});case 9:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a}return Object(g.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(v,{isAuthenticated:this.state.isAuthenticated,searchHashtag:this.searchHashtag,onSuccess:this.onSuccess,onFailed:this.onFailed,logout:this.logout}),n.a.createElement(T,{tweets:this.state.tweets}),n.a.createElement(b,null))}}]),t}(A.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},45:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAABmJLR0QA/wD/AP+gvaeTAAACK0lEQVRIia3Vv2sTYRjA8e9FYiM0jqKVNA5uIoqDKIiTQwd11CLSv6BS3YROtktFlBYXwbUOxU3pYoO/yFRpqYJDC2I7GBFLUWOruco9Ds9zTTzz3l1+PPDwHsnzfvLeve898YiPI8AZ4CCQAQLgE1AG3ifM/S/OAfOA9IOcB7lqYz8ImvNWlxgeMOFBMAiyCBKASCQXQQZBPF35hM1zgpN5kKdNoGb5BCSvq550wSM5kHJKMMwySE7hkSjYB2zebREM856im+bsxHgRxG8T9UEOKTwOekwALg4B2TRb2SSywJA54We7gFopZiUlkJsgCwk1QM08coCsOIo/gmTtbPaCbDjqVurnNxfePuK4tQqwbdc/gR+Ousb5GcAH/DVH8WngGlBEd6HoqLP5viUAS6Nt7nyYo7rYpcYfGiuA1Do4UgVFxxrRA0D1dpvoHQWr5vwTw7tBXrYIvgLpUXTY8biZyoO8SQkugOxVcMoFgnaaR30glQRwvf4cZ4hpfWHsAd4N0LyXhnlZwWWgNwkM4ziwPe0A5+pvz9m0YBj3CyC/I2AAclLBx62CAPuArYcR9LmCAXC0HRTgwbEIeknRUrsgwAlA3hr4jZ2/jiudoADLtwydUXCLhB3PxH1pMTtnF890eIF2wY7iQo81m8O60hudggD7sZ7gKXqqGyjA1+sK/kHfuNhI80wBVl/ruAb86ha6/qGOJkZadOO7jtVuol9srHQT/Wzjapriv73qBcMc5RzUAAAAAElFTkSuQmCC"},46:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAABmJLR0QA/wD/AP+gvaeTAAACI0lEQVRIia3VzW9MYRTH8c+MlJGopXhJWws7EWIhJGJlYYEljYi/gJSdxAobIkRjI7Fl0dgRG228pStCkFiQiFqoiKZBtXTIHIt776Smc2emM/M7uXme5J7zvfd5znnOU9BYm7EbG1BEBZ8wjjdNYhdpL54i9Av7haPp2C8Q6fu9rcAKuKCgYlB4IVTEInshDAoFFVxI43KBV/UKd+uA6tkdoVfgah54SEkYbxGY2bhQEhiqBa7HrMtLBGZ2RWA25VR13oBQbhNaFjYKnCcpEzjoGHpayWUd9eBYykm1DPPGGvzJmHBaeN7Eh/mUp4TwLsf5g9Ajqc1VwnSO3ztZ/ZaK1SVEztIm8Sed/8SPHL8F8UWUUfYxx3kXTmBAkoaBHL8kvpw+4KUzbWY+szMCLxd+55w+Yb6DkuoTOLcQug4zLrYJvSQwk3L+03HLhUdLBD4WVggcz9ltw3qFZy0CnwurBYbzgCSd5pb1wmQT4FR1H0c0aH2ZVuK1fer30swOC7zFqmbATNvwx80c4Kjs9OxpFZjpmj7hdw2wIuwQuL1UIKzBnBs10AdCcgFuaQcK122tgR4SGGsXCNsRXqXAb7Kr40gnUHjrbAodEZjTJOPFRi9T3TOazu6Dh5Im2JEOWCFpNpsETnUKhLVIekJBYGc3oPDVSYG/khPXUK3sKUx4gqS//+oWdMr7KrSpWoVO+46kEXcN+iUdJ7sJ/ZyOE604/wPm7AXDdPldPAAAAABJRU5ErkJggg=="},47:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAABmJLR0QA/wD/AP+gvaeTAAACjklEQVRIia3Vz2tUZxTG8c9NGTOFjLgqbcoYF+5KtQQqFYqrLty0Sw1d5C9QpDtpdgaKIorSTcGtXZRuQsSFZrAKswsZTKCLDohV6LSFEKLGNpnQOV3cmSHT3pncTHzg8L73ved873l/3PMmBusDfIr3MYIWfkMVP/cLSvqMf4Zv8PHhwxw7xqFDrK+zssLz52ARX6OyS2ISXE4SrakpUauJVktE9FqtJqamRJJo4fKA5CS4USqJO3f+D8qy+XlRKgnc6Ae+UCyKajUfsGPVqigWBS78FziO19eu7Q3YsevXBV63OV3NTkyIZnM4aLMpjhwRmCU9JvDF9DSFwm77mK1CgenplNMZewtblUr/TCoVcfGiWFoa7IOtNk8RUa9nOz99KgoFgRgbE2tr2X71euqDYmf6IrKn1miwvZ32NzZ4+TLbb2f8CJpoPnuW7XzyJOfPMzHB7GzaZqkd32wbeDwzM9zOd2xmRuDxzg9dKpfF1tbwR6pcFri0E/oeXl25Mhz06lWBV21Oj84dOCAePtwb8NEjMToqcC57tblZKonFxXzApSVx8KDAzX5A0krz/fi4aDQGA1dXu+v4gwGlr6O3sXL6dHYt7djZswK/YGw3YEcfYfv27WzgwkL37zmVF9jRt+Wy2NzsBbZa4sQJgR/3CoR38NetW73QBw+E9AL8cBgofHf8eC/0zBkhx2U3SJOI5eUUuL7evTq+HBQ0MuglaqjPzaUP9+6xuelvzO8HCncXFtLO/fvgJ2zkiBuoz0dH02Jz9KjAV/sFwrukNSFJBD7ZLSDP9P/A6twcEf7B8j6T7GpxclLgSR7nPJnC6pMU1+fSGQ669uIF0kL8xqB/ttvGm4T+3m5/zeP8L53k2ykBiMSvAAAAAElFTkSuQmCC"},48:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAABmJLR0QA/wD/AP+gvaeTAAACG0lEQVRIia3Vz4uNURzH8dcdDaOGpRiZsbCTyEKUrCwssESSv4CwU7PChkRko2xZTHZkYya/mtVoJpTFKGFhJNPk53CH7tfiPE9X133uvXPv/dS3czrP5/vuOb++p6SxNmIn1qIHFbzHOF42yf1PuzGBYDDYGxzJ2sFI4yYyX1OVcJ5ShUPBVFAJoiamIn0vVZJfqRHwCiuCu3VA9eJOJL8rReAT9AXjLQLzGI+U50QtcAA/uLRIYB6XI+Ub+Bd6jqFgoU3oQrA+EicdE9jPUfS2spl11Cvl25+PLEGZsQZ/MhacDiabeJQznj4ErwrMb4Le7Gz2B3MFvlf5+e3rqU4hCqY2g99Z/zu+Fviq+T1YSPGuwLwDxzEk7cNQge+dKivpGcNt7nwew5E4VZ1lXVDu4Eiti8Spag2+caFN6MVI+dbULsoxlgaPFgl8HCyLlF9fV1OBeNoicDJYGSmvWCXcYiCYaQKczddxRIPSl2s5XrAn6tfSPA4GptHfDJhrC35zswA4mt+eXa0Cc11L0/tVA6wE2wK3FwuEVZjnRg30QUgP4KZ2oHCdzTXQA4GxdoGwFcHzDPg5sqfjcCdQmOZMBh0JzGuy4z2NPma6x2jWvQ8PpRrYkfala1gONgROdQqE1chqQimwvRtQ+MTJwB/pxjVUK2sKb3lCKu8/uwWd5XUObapWoXN8IRXirkE/Zu1MN6EfsvZtK+a/D/0Fwy7hGqoAAAAASUVORK5CYII="},49:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAABmJLR0QA/wD/AP+gvaeTAAAC2klEQVRIia2Vv0sbYRiAn7OcSSEnTqW1nOfgIJRqCVQqlLh0cKmjhg75CxTpaLMZKIooSpeCqx1Kl6B00FQbIVvwUKFDA2IVmrYQQvzVJie9t0NyovYSz+gDxwd37/vc+33f3fcq1OYB8BS4DzQANvAdSAFfqiUpVe4/A14Dj1tbW+ns7KS5uZlCocDW1hZ7e3sAaeAV8OmSwlCAcUVR7HA4LKZpim3bchHTNCUcDouiKDYwXqM4FGBG0zRZXFz8T+TGwsKCaJomwEw18Yjf75dUKuVJ6JBKpcTv9wswclHYAhxPTU1dSegwPT0twHHFc0rMMAyxLKsuqWVZ0tbWJkAMyp8JQH8kEkFV1cs20hVVVYlEIgD9jvQW0NHb21s1aWVlhdHRUUzTrBoTCoUAOio+/IBkMhnXqe3s7IiqqgJIIBCQfD7vGpfJZAQQwO9MHxFxrSCbzXJycgLA0dERBwcHrnFn8xsAC7B2d3ddg3t6ehgeHsYwDGKxGIZhuMZV8q3KBcBGNBqta+cdotGoABtnXzSm67qUSqW6hJZlia7rAoydld4DDicmJuqSTk5OCnBY8ZxjqLGxUZLJ5JWEa2tr4vP5BBhyXWxgVtM0SafTnoTr6+vS1NQkwGw1IZRPmnctLS2SzWZrCnO5nLOO76lx9DncBrb6+vpcz1KHwcFBAb4CgcuEDo+Ak/n5eVdhIpFw/p6QV6HDG13XpVgsnhPati3d3d0CfLiqEOAO8Htubu6cdHV1VSg3wIf1SAHednV1nZMODAwIHppdLYKAbG5uiohIoVBwWseLWkkNtR4CJpCJx+MALC0tUSwW/wAL15ECfEwkEgAsLy8DfAaOPOTV5LnP55NSqSTt7e0CvLyuEOAuIMlkUhRFEeDJZQlepv8TyMXjcUTkL7B5zSJPSQeDQQG2vQR7qRQgt729DeDec+qU5vf396F8EN+Y9FdlzN6k9Edl/OYl+B/a3XuLDsvUPAAAAABJRU5ErkJggg=="},50:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAABmJLR0QA/wD/AP+gvaeTAAACj0lEQVRIia3Vz2tUZxTG8c+NjJlCRlwVmzKOC3elWgIVhdJVF27qUoOL/AWKdCfNzkBRRFG6EdzaRekmRLrQDDbC7EIGE+iiA2IVOm0hhKixzUzonC5mrmTaO5PJxAcOF977nO8974/7nkR/fYTP8CFG0MJvqODnXklJj/Ev8A0+PeywY4456KB161aseOEFLOJrlHcoTIKriaQ1aTKqqtHSihBdUVWNSZORSFq42qc4CW4VFOK++/8DZcWcuSgoBG71Al/Ky0dFZSBgGhWVyMsHLv0XOI43N9zYFTCNm24G3nQ4bzVTUoqm5lDQpmYccSQwQ/uYwJkpU3JyO21kpnJypkzBmXRsHxpl5Z6VlJXjssuxZKmvB40OTx5RU8s0P/MscnKBGDMWa9YyfTW1QCCfTl+IzKnV1W3ZAhs2vPIq07c9fwRNNJ97nmk+5ZSLLiopmTGjpJTp6+Q3OwGeTJseaufTmDYdeLL9Q1eKitHQGPpIFRUDV7ZDP8Dra64NBb3ueuB1h9OlC/vtjwULuwI+9jhGjQYuZC42bhcUYtHiQMAlS3HAgcDtXkDaN81348ajrt4XuGo1Xcfv9bn6Ur2HldNOZ96laZxzLvALxnYCpvoEW/fcywTOm0//ns8HBab6tqgYmza7gC2tOOFE4IfdAuF9/HXX3S7oI49CuwF+PAwU7hx3vAt61tkwQLPrpwnEsuUIEevW09Zxvl/SSL+XqKI2axY88MCmzb8xtxco/DhvHjz0EH7CxgB5ffXlqNFoaMRRRwNf7RUIhxALFiKRBE7ulDDI9P/A6qxZIf7B8h6LfKvFCROBp4OYB6kUVp+2edk9Z0jo2ksvaV/E7wz6Z+dZf5fQ3zvPXwcx/wvEL9spDczf7QAAAABJRU5ErkJggg=="},51:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAABmJLR0QA/wD/AP+gvaeTAAACj0lEQVRIia3VwWsUZxjH8c+krFkhK55KG1njwVuplkClQunJg5d61NBD/gJFepPmZqAooii9FLzaQ+klRHrQLFZhbyGLCfTQhWAVum0hhKixTTZ0nx5mJ2Tb2c1m4w8e3ndmnuc7z/vOO8+T6K0P8CmOYAgt/IYqfu4WlHS5fwZf42NHj3LiBIcPs7bG0hIvXsA8vkJll8QkuCZJWiYmQq0WWq0Q0Wm1WpiYCEnSwrUeyUlwW6kU7t//PyjPZmdDqRS43Q18WbEYqtX+gJlVq6FYDFz+L3AUb9y8uTdgZrduBd60OduaNjYWms3BoM1mOHYsME16TOCcyUkKhd0+ZL4KBSYnU05b72BTpdI9k0olXLkSFhZ6+7DZ5iki1Ov5zs+ehUIhEEZGwupqvl+9nvpQHNpeQkT+0hoNtrbS+fo6r17l++2IH0ITTc+f5zufPs2lS4yNMT2djnlK45ttA09NTQ325TObmgo83fmeq8rlsLk5+JEqlwNXd0Lfx2vXrw8GvXEj8LrN6dBFBw6Ex4/3BnzyJAwPBy7mbzZ3lEphfr4/4MJCOHQocKcbkLTSfGd0NDQavYErK9k+fq9H6ct0EEvOns2vpZlduBD4BSO7ATN9hC337uUD5+ayv+ezfoGZvlEuh42NTmCrFU6dCvywVyC8i7/cvdsJffQopA3ww0Gg8K2TJzuh58+HPppdL40jLC6mwLW1rHV80StoqNdD1FA3M5NePXjAxsbfmN0PFH40N5fOHj6En7DeR1xPfW54OC02x48HvtwvEN5DWhOSJPDJbgH9LP8PrJiZIeIfLO4zyW3NGx8PLPfj3E+msGJ5Gbr0nMGgq16+JC3Ebw36Z3tsvE3o7+3x136c/wXqetsp8dQwFwAAAABJRU5ErkJggg=="},52:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAABmJLR0QA/wD/AP+gvaeTAAADYElEQVRIia2WT0gjVxzHP6MxaPRUYQZaT4qwWJqCodRDKUGaSw9rTh6L0PSw5LCUSlFPpYUqVSithy2F1NKDB6moiz2USDYU/zZRmwl1dWNDe6g2TmzxzxjMjJkezOwm68wag9/Lg/e+3w/zm/d780bgxXoVeAt4BagBCsDfwCLwu11IsJl/B/gceEMURVpbW2lsbERVVdLpNAcHBwAxYAhYuA4qAMOCIHzs9XqF3t5e2traEIRy2+7uLlNTU0SjUcMwjC+AQcCwggrAly6X6/7g4CBdXV121T3V6uoqw8PDnJ2dfQV8aIJrSzz3nU7nJyMjI3R2dl4LBGhpacHtdhOJRLouLi7+A9ZKoS8Dc4FAoM7r9VYENCWKIvX19cTj8beB74GTmuLaPUmSXH6//0ZAUz09PUiS5ALuwWWbANz1+Xw4HI6qoA6HA5/PB3DXhNYCd9xut21oc3OTUChEKpWy9RTzd4BaB1AHOEVRtDRnMhmGhobQdZ25uTkmJydpamq64ivmnUCdWT6GYVwxAmSzWXRdByCXy6GqqqWvNF8D5IF8JpOxNHd0dOD3+5Ekib6+PiRJsq3IZDm4PM+PZVl+3ePxXDELgkAwGCQYDFrCTMmyDPAYKJjlPwyHw0/LvKl0XSccDgM8hGct9UBRlNPp6emqoDMzMyiKcgo8gGcn6hQ4kWX5XbfbbfverJRMJhkdHaVQKHwEREqhAL8WCoWXFhcX3/R4PDQ3N18LTKVSDAwMcH5+/jXwqTlf+5zvZ03T2tfW1l7r7u6moaHBFnh8fEx/fz9HR0dTQKB0reY5rwEEDg8Pk2NjY7a9CzA+Po6iKE+A9yn5llpBAXLAe7FYTI9EIpbAjY0NotEowAdc7keZrKAAvwHfhEIhNE0rL8UwmJiYAPgR+MUqbAcF+ExRlNzCQvkVlEgk2N7eNijZmJtAD4AfZmdnyybn5+fhsnWS1UABvk2n06TTaQBUVWVlZQXguxeFroNuAE+Wl5cBiMfj5PP5HMXjWC0U4Kf19XUAiuMjLHb8ptBHOzs76LpOIpEAi5+HaqAxTdPY2tpif38fYOU2oP8A2aWlJQzDuAASFWQqUqy9vd0A/qjEXMmTAmT39vYA/rpN6L/FC+/kNqHmrbh3m9D94vhnJeb/AQaRTprAk/bgAAAAAElFTkSuQmCC"},70:function(e,t,a){e.exports=a(167)},75:function(e,t,a){}},[[70,1,2]]]);
//# sourceMappingURL=main.c09b467d.chunk.js.map