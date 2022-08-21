
<!-- Cấu hình hệ thống -->
#Config.Domain
#Config.Title
#Config.Logo
<!-- Thông tin liên hệ -->
#Config.ContactAddress
#Config.ContactMap
#Config.ContactInfo
<!-- Email -->
#Config.ContactMail1
#Config.ContactMail2
<!-- Hotline -->
#Config.Hotline1
#Config.Hotline2
<!-- Mạng xã hội -->
#Config.SocialFb
#Config.SocialYt
#Config.SocialTw
#Config.SocialIg
#Config.SocialZl


<!-- Dữ liệu Element -->
<div data-repeat="true" data-rows="0" data-type="nav" data-source="header-nav">
data-source: nguồn dữ liệu
data-type: loại dữ liệu, có thể kết hợp: nav/link, text/content/html, image/icon
Thường dùng: header-nav, footer-nav, home-banner

#Element.Id
#Element.Name
#Element.Image
#Element.Link
#Element.Desc
#Element.Content 


<!-- Dữ liệu Blogs -->
<div data-repeat="true" data-rows="0" data-type="blogs" data-source="ID">
data-source: ID của danh mục

<!-- Trang bài viết -->
#Post.Id
#Post.Name
#Post.Image
#Post.Date
#Post.Link
#Post.Desc
#Post.Content
#Post.Category
#Post.ParentId
#Post.Creator


<!-- Phân trang -->
<nav data-bind="true" data-type="pagination" data-source="#Post.Link">
<!-- Breadcrumb -->
<ul data-bind="true" data-type="breadcrumb" data-source="#Post.Id">
































