- BLOB FEELINGS REGARDING THEM - 
<% if((sentimentScore/statuses.length) > 0.5) { %>
    <img id="loveblob" src="/loveblob.png" alt="loveblob" >
<% } %>
<% if((sentimentScore/statuses.length) < -0.5) { %>
    <img id="angryblob" src="/angryblob.png" alt="angryblob" >
<% } %>
<%else {%>
    <img id="neutralblob" src="/neutralblob.png" alt="neutralblob">
<% } %>