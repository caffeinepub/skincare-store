import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
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
    user : Principal.Principal;
  };

  type OldActor = {
    products : Map.Map<Nat, Product>;
    nextProductId : Nat;
  };

  type NewActor = {
    products : Map.Map<Nat, Product>;
    nextProductId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    // Only add "Glow man face wash" if it does not already exist
    let newProducts = switch (old.products.get(1)) {
      case (null) {
        let defaultProduct : Product = {
          id = 1;
          name = "Glow man face wash";
          description = "Specifically formulated for men, this gentle cleanser effectively removes dirt, oil, and impurities, leaving your skin feeling refreshed and clean. Enriched with natural ingredients to help prevent breakouts and promote a healthy complexion. Perfect for daily use.";
          price = 120;
          imageUrl = "https://ipfs.io/ipfs/QmGlowManFaceWashImage";
          category = "cleanser";
          stock = 50;
        };
        old.products.add(1, defaultProduct);
        old.products;
      };
      case (?_existing) {
        old.products;
      };
    };
    { old with products = newProducts };
  };
};
