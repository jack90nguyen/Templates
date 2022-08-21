

# Sắp xếp theo data-sort
0: mới nhất, 1: nổi bật, 2: Giá cao, 3: Giá thấp, 4: Bán chạy, 5: Ngẫu nhiên, 6: Xem nhiều


# Danh sách tin, có phân trang:
data-repeat="true" data-rows="10" data-type="blog-list" data-source="#Post.Id" data-pagination="true" data-sort="0"


# Tin liên quan:
data-repeat="true" data-rows="5" data-type="blogs" data-source="#Post.ParentId"  data-sort="0"


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
<div data-repeat="true" data-rows="0" data-type="blogs" data-source="ID" data-sort="0">
data-source: ID của danh mục
data-sort = 0: mới nhất, 1: nổi bật, 2: Giá cao, 3: Giá thấp, 4: Bán chạy, 5: Ngẫu nhiên

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
#Post.Price
 → <strong>1,550,000 ₫</strong><span>(-6%)</span><del>1,800,000 ₫</del>


#Product.Price 
  → <span>1,550,000 ₫</span><del>1,800,000 ₫</del>


data-bind="true" data-type="post" data-source="ID"



# DỮ LIỆU KHÔNG LẶP: data-bind="true"

# Breadcrumb:
<nav class="breadcrumb is-size-7">
  <ul data-bind="true" data-type="breadcrumb" data-source="#Post.Id">
    <li><a href="/">Trang chủ</a></li>
    <li><a href="/">Danh mục</a></li>
    <li class="is-active"><a href="#">Chi tiết</a></li>
  </ul>
</nav>

# Pagination: data-pagination="true"
<!-- Phân trang -->
<nav class="pagination is-centered">
  <ul class="pagination-list">
    <li><a class="pagination-link is-current">1</a></li>
    <li><a class="pagination-link">2</a></li>
    <li><a class="pagination-link">3</a></li>
    <li><a class="pagination-link">4</a></li>
    <li><a class="pagination-link">5</a></li>
    <li><span class="pagination-ellipsis">…</span></li>
    <li><a class="pagination-link">16</a></li>
  </ul>
</nav>

# Tags:
data-bind="true" data-type="tags" data-source="#Post.Id"
#Tag.Id
#Tag.Name
#Tag.Link

# Images:
data-bind="true" data-type="images" data-source="#Post.Id"
#Image.Id
#Image.Name
#Image.Link

# Images Childs: hình ảnh của các trang con
data-bind="true" data-rows="0" data-type="images-childs" data-source="#Post.Id"
#Image.Id : ID trang cha
#Image.Name : tên trang cha
#Image.Link : link hình
data-rows: số trang con cần lấy
sắp xếp ngẫu nhiên

# Navbar:
data-bind="true" data-type="nav" data-source="header-nav"

# Post Data:
data-bind="true" data-type="post" data-source="-PostId-"
#Data.Id
#Data.Name
#Data.Image
#Data.Link
#Data.Desc
#Data.Content 

# Category Data:
data-bind="true" data-type="category" data-source="-ParentId-"
#Category.Id
#Category.Name
#Category.Image
#Category.Link
#Category.Count

# Element Data:
data-repeat="true" data-rows="0" data-type="link/nav-image/icon-text/content/html" data-source="header-nav"
#Element.Id
#Element.Name : có thể dùng | để xuống hàng
#Element.Image
#Element.Link
#Element.Desc
#Element.Content 

# DỮ LIỆU DÙNG VÒNG LẶP:
data-repeat="true" data-rows="0" data-type="image" data-source="home-slide"

Số lần lượng hiển thị: data-rows: = 0 hiển thị tất cả
Nguồn dữ liệu: data-source:
Element (dạng text)
Blogs/Products (ID danh mục)
Element: data-type="link/nav - image/icon - text/content/html"

data-type = text nhập văn bảng thường
data-type = content khung soạn thảo văn bản chuyên nghiệp
data-type = html khung nhập code HTML

Muốn lặp phần tử con thì dùng các thông số như Element chính những data-source="in"
Blogs: data-type="blogs", "blog-list", "products"


# blog Data
#Blog.Id
#Blog.Name
#Blog.Image
#Blog.Date
#Blog.Link
#Blog.Desc
#Blog.Category 

# Thuộc tính của Blog Data
data-source="post" data-type="tags" 
  #Tag.Name
  #Tag.Link

data-source="post" data-type="images" 
  #Image.Name
  #Image.Link
  #Image.Thumb

data-source="post" data-type="attributes" 
  #Attribute.Icon
  #Attribute.Name
  #Attribute.Value


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