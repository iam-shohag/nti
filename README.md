# 🛒 eCommerce Database

A comprehensive, production-ready MySQL database schema for a full-featured eCommerce platform with support for multi-product catalog, order management, payment gateways, user authentication, and Bangladesh-specific features.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Database Statistics](#database-statistics)
- [Installation](#installation)
- [Database Structure](#database-structure)
- [Demo Data](#demo-data)
- [Documentation](#documentation)
- [Developer](#developer)
- [License](#license)

## 🎯 Overview

This eCommerce database is designed for a comprehensive online shopping platform built with **Laravel** framework. It supports a wide range of eCommerce features including product management, shopping cart, order processing, multiple payment gateways, user authentication, reward systems, and more.

### Key Highlights

- ✅ **45 Database Tables** - Comprehensive schema covering all eCommerce needs
- ✅ **216 Sample Products** - Ready-to-use demo data
- ✅ **Multi-Payment Gateway Support** - Stripe, PayPal, bKash, Nagad, Rocket, SSL Commerce
- ✅ **Bangladesh-Specific** - Districts, Upazilas, and local payment methods
- ✅ **Role-Based Access Control** - Admin panel with granular permissions
- ✅ **Reward System** - Coins/points for purchases and referrals
- ✅ **Product Reviews** - Customer review and rating system
- ✅ **SEO Optimized** - Meta tags, slugs, and schema markup support

## ✨ Features

### Core Features

- **Product Management**
  - Hierarchical category structure (unlimited nesting)
  - Multiple product images with primary image designation
  - SKU-based inventory tracking
  - Price and compare-at-price for discounts
  - Stock management
  - Featured products
  - Custom page builder support (JSON)
  - SEO meta fields

- **Order Management**
  - Complete order lifecycle tracking
  - Order status workflow (pending → processing → shipped → delivered → completed)
  - Payment status tracking
  - Shipping status management
  - Order items with product snapshots
  - Unique order numbering system

- **Shopping Cart & Wishlist**
  - Persistent cart for logged-in users
  - Session-based cart for guests
  - Coupon application
  - Automatic total calculations
  - Wishlist for users and guests

- **User Management**
  - Email/Phone-based authentication
  - OTP verification system
  - Multiple addresses per user
  - Bangladesh-specific address fields (Division, District, Upazila)
  - Referral program with unique codes
  - Reward points/coins system

- **Payment & Shipping**
  - Multiple payment gateways
  - Payment gateway settings with encryption
  - Shipping settings with tax calculation
  - Free shipping thresholds
  - District-based shipping rates

- **Marketing & Promotions**
  - Coupon system (percentage/fixed)
  - Usage limits (global and per-user)
  - Date-based validity
  - Category/product-specific coupons
  - Newsletter subscriptions

- **Content Management**
  - Dynamic CMS pages
  - SEO-friendly slugs
  - Meta tags support
  - Help Center, Shipping Info, Returns, Contact pages

## 📊 Database Statistics

| Metric | Count |
|--------|-------|
| **Total Tables** | 45 |
| **Products** | 216 |
| **Categories** | 18 |
| **Users** | 4 (demo) |
| **Orders** | 3 (demo) |
| **Order Items** | 7 (demo) |
| **Districts** | 64 (Bangladesh) |
| **Currencies** | 4 (BDT, USD, EUR, GBP) |
| **Coupons** | 5 |
| **CMS Pages** | 4 |

## 🚀 Installation

### Prerequisites

- MySQL 8.0.30 or higher
- PHP 8.3.0 or higher (for Laravel)
- phpMyAdmin or MySQL command line

### Steps

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd shohag-nti
   ```

2. **Create a new MySQL database**
   ```sql
   CREATE DATABASE ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Import the SQL file**
   
   **Using phpMyAdmin:**
   - Open phpMyAdmin
   - Select the `ecommerce` database
   - Go to Import tab
   - Choose `ecommerce.sql` file
   - Click Go

   **Using MySQL command line:**
   ```bash
   mysql -u your_username -p ecommerce < ecommerce.sql
   ```

4. **Verify the installation**
   ```sql
   USE ecommerce;
   SHOW TABLES;
   SELECT COUNT(*) FROM products;
   SELECT COUNT(*) FROM categories;
   ```

## 🗄️ Database Structure

### Core Tables

#### User & Authentication
- `users` - Customer accounts
- `admins` - Administrator accounts
- `sessions` - User session management
- `otp_codes` - OTP verification codes
- `user_addresses` - User shipping/billing addresses
- `user_points` - Reward points/coins transactions

#### Products & Catalog
- `products` - Product catalog
- `categories` - Hierarchical product categories
- `product_images` - Product images
- `product_reviews` - Customer reviews and ratings

#### Orders & Cart
- `orders` - Order records
- `order_items` - Order line items
- `carts` - Shopping carts
- `cart_items` - Cart items
- `wishlists` - User wishlists
- `guest_wishlists` - Guest wishlists

#### Payment & Shipping
- `payment_gateway_settings` - Payment gateway configurations
- `payment_logs` - Payment transaction logs
- `shipping_settings` - Shipping configuration
- `districts` - Bangladesh districts
- `upazilas` - Bangladesh upazilas

#### Marketing & Content
- `coupons` - Discount coupons
- `coupon_usages` - Coupon usage tracking
- `newsletter_subscribers` - Newsletter email list
- `newsletter_settings` - Newsletter configuration
- `pages` - CMS pages

#### Settings & Configuration
- `site_settings` - General site settings
- `email_settings` - Email configuration
- `otp_settings` - OTP configuration
- `coin_settings` - Reward points settings
- `storage_settings` - File storage settings
- `currencies` - Currency management

#### Admin & Permissions
- `roles` - Admin roles
- `permissions` - Granular permissions
- `model_has_roles` - Role assignments
- `role_has_permissions` - Permission assignments

### Key Relationships

```
users (1) ──→ (N) orders
orders (1) ──→ (N) order_items
products (1) ──→ (N) order_items
categories (1) ──→ (N) products
categories (1) ──→ (N) categories (self-referencing)
products (1) ──→ (N) product_images
users (1) ──→ (N) carts
carts (1) ──→ (N) cart_items
districts (1) ──→ (N) upazilas
```

## 🎁 Demo Data

The database includes comprehensive demo data:

### Users
- **Test User** - Default test account
- **John Doe** - Sample customer with completed order
- **Jane Smith** - Sample customer with processing order
- **Ahmed Rahman** - Sample customer with pending order

### Orders
- **ORD-2025-0001** - Completed order (John Doe, COD payment)
- **ORD-2025-0002** - Processing order (Jane Smith, SSL Commerce)
- **ORD-2025-0003** - Pending order (Ahmed Rahman, bKash)

### Products
- 216 products across 18 categories
- Various price ranges and stock levels
- Featured products included
- Product images configured

### Other Data
- 5 discount coupons
- 4 CMS pages (Help, Shipping, Returns, Contact)
- 64 Bangladesh districts
- 4 currencies (BDT, USD, EUR, GBP)
- Complete admin setup with permissions

## 📚 Documentation

For detailed documentation, please see:

- **[documentation.html](documentation.html)** - Complete interactive documentation with:
  - Database architecture overview
  - Table structure details
  - Relationship diagrams
  - Feature descriptions
  - Security considerations
  - Future enhancements

Open `documentation.html` in your web browser for the full documentation experience.

## 👨‍💻 Developer

**Md. Yamin Hossain**  
🕷️ Cod3d Spid3r | Sr. Software Engineer

- **Company:** ANSNEW TECH.
- **Location:** Dhaka, Bangladesh
- **Specialization:** Scalable systems, infrastructure automation, and intuitive user experiences

### Connect

- 🌐 **Website:** [needyamin.github.io](https://needyamin.github.io)
- 💻 **GitHub:** [@needyamin](https://github.com/needyamin)
- 📚 **ORCID:** [0009-0009-1184-6005](https://orcid.org/0009-0009-1184-6005)
- 📘 **Facebook:** [needyaminofficial](https://www.facebook.com/needyaminofficial)


## 🔧 Technical Details

### Database Engine
- **Engine:** InnoDB
- **Character Set:** utf8mb4
- **Collation:** utf8mb4_unicode_ci
- **Version:** MySQL 8.0.30

### Design Principles
- ✅ **Normalization:** Follows 3NF (Third Normal Form)
- ✅ **Referential Integrity:** Foreign key constraints
- ✅ **Performance:** Indexed columns for optimal queries
- ✅ **Flexibility:** JSON fields for extensible data
- ✅ **Security:** Encrypted sensitive data

### Payment Gateways Supported
- 💳 Stripe
- 💳 PayPal
- 💳 bKash (Bangladesh)
- 💳 Nagad (Bangladesh)
- 💳 Rocket (Bangladesh)
- 💳 SSL Commerce (Bangladesh)

## 🔐 Security Features

- Password hashing using bcrypt
- Encrypted payment gateway credentials
- OTP code expiration
- Session management with IP tracking
- SQL injection prevention through parameterized queries
- Role-based access control (RBAC)

## 🚧 Future Enhancements

Potential improvements for future versions:

- [ ] Inventory management with low stock alerts
- [ ] Product variants (size, color, etc.)
- [ ] Multi-vendor support
- [ ] Advanced analytics and reporting tables
- [ ] Order return/refund tracking
- [ ] Product comparison features
- [ ] Advanced search with full-text indexing
- [ ] Multi-language support
- [ ] Product bundles and packages

## 📝 License

This database schema is provided as-is for educational and commercial use. Please ensure compliance with your local data protection regulations (GDPR, etc.) when implementing in production.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [GitHub repository](https://github.com/needyamin) for more projects.

## 📞 Support

