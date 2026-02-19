import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : Text;
    stock : Nat;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type Order = {
    orderId : Nat;
    items : [CartItem];
    totalAmount : Nat;
    user : Principal;
  };

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, Map.Map<Nat, CartItem>>();
  let orders = Map.empty<Nat, Order>();

  var nextProductId = 2; // Start from 2 since we have a default product now
  var nextOrderId = 1;

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, imageUrl : Text, category : Text, stock : Nat) : async () {
    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      imageUrl;
      category;
      stock;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not products.containsKey(productId)) {
      Runtime.trap("Product does not exist");
    };

    if (quantity == 0) {
      Runtime.trap("Quantity must be greater than zero");
    };

    let userCart = switch (carts.get(caller)) {
      case (null) { Map.empty<Nat, CartItem>() };
      case (?cart) { cart };
    };

    let newItem : CartItem = { productId; quantity };
    userCart.add(productId, newItem);
    carts.add(caller, userCart);
  };

  public query ({ caller }) func viewCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.values().toArray() };
    };
  };

  public shared ({ caller }) func checkout() : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        let items = cart.values().toArray();
        let totalAmount = items.foldLeft(0, func(acc, item) { acc + getProductPrice(item.productId) * item.quantity });
        let order : Order = {
          orderId = nextOrderId;
          items;
          totalAmount;
          user = caller;
        };
        orders.add(nextOrderId, order);
        nextOrderId += 1;
        carts.remove(caller);
      };
    };
  };

  func getProductPrice(productId : Nat) : Nat {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product.price };
    };
  };

  public query ({ caller }) func getProductImage(productId : Nat) : async Text {
    switch (products.get(productId)) {
      case (null) {
        Runtime.trap("Product does not exist");
      };
      case (?product) {
        product.imageUrl;
      };
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  // Helper function to initialize default product
  public shared ({ caller }) func initializeDefaultProduct() : async () {
    let defaultProduct : Product = {
      id = 1;
      name = "Glow man face wash";
      description = "Specifically formulated for men, this gentle cleanser effectively removes dirt, oil, and impurities, leaving your skin feeling refreshed and clean. Enriched with natural ingredients to help prevent breakouts and promote a healthy complexion. Perfect for daily use.";
      price = 120; // Price updated to INR 120
      imageUrl = "https://ipfs.io/ipfs/QmGlowManFaceWashImage";
      category = "cleanser";
      stock = 50;
    };
    products.add(1, defaultProduct);
  };
};

