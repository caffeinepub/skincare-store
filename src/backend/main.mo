import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : Text;
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

  var nextProductId = 1;
  var nextOrderId = 1;

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, imageUrl : Text, category : Text) : async () {
    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      imageUrl;
      category;
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
};
