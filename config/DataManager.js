export default class DataManager {
  static myInstance = null;

  users = []; //Storing registered users

  currentUser = null; //Current logged in user

  //For collections:
  // testCollections = [

  //     {
  //         id: 1,
  //         title: "Collection 1",
  //         image: require('../assets/charity1.jpg'),
  //     },
  //     {   id: 2,
  //         title: "Collection 2",
  //         image: require('../assets/charity2.jpg'),
  //     },
  //     {   id: 3,
  //         title: "Collection 3",
  //         image: require('../assets/charity2.jpg'),
  //     },
  // ]

  defaultCategories = [
    //Default set of categories applicable to each screen
    {
      id: 1,
      title: "Education",
      color: "skyblue",
      image: require("../assets/education.png"),
    },
    {
      id: 2,
      title: "Health",
      color: "lightcoral",
      image: require("../assets/heartbeat.png"),
    },
    {
      id: 3,
      title: "Food",
      color: "lightsalmon",
      image: require("../assets/diet.png"),
    },
    {
      id: 4,
      title: "Research",
      color: "mediumseagreen",
      image: require("../assets/research.png"),
    },
  ];

  static getInstance() {
    if (DataManager.myInstance == null) {
      DataManager.myInstance = new DataManager();
    }

    return this.myInstance;
  }
  //Handling user registration,login and retrieval:
  createUser(name, email, password) {
    const newUser = {
      id: this.users.length + 1,
      name,
      email,
      password,
      collections: [], // Initialize an empty array to store user collections
    };

    this.users.push(newUser);
  }

  //Setting the current user:
  setUser(email, password) {
    this.currentUser = this.users.find(
      (user) => user.email === email && user.password === password
    );
  }

  //Retreiving a user:
  getUser() {
    return this.currentUser.name;
  }

  //Adding a collection:
  addCollection(title, image) {
    const id = this.currentUser.collections.length + 1;

    if (image == null) {
      image = require("../assets/charity2.jpg");
    }

    const newCollection = {
      id,
      title,
      image,
      categories: this.defaultCategories.map((category) => ({
        ...category,
        charities: [], // Initialize an empty array for each category's charities
      })),
    };

    this.currentUser.collections.push(newCollection);
  }

  //Retrieving a collection:
  getCollection() {
    return this.currentUser.collections;
  }

  //Deleting a collection:
  deleteCollection(collectionID) {
    const deleteID = this.currentUser.collections.findIndex(
      (collection) => collection.id == collectionID
    );

    if (deleteID !== -1) {
      this.currentUser.collections.splice(deleteID, 1);
    }
  }
  //Updating a collection
  updateCollection(collectionID, title, image) {
    const currentCollection = this.currentUser.collections.find(
      (collection) => collection.id === collectionID
    );

    if (currentCollection) {
      // Update the collection properties
      currentCollection.title = title;
      currentCollection.image = image;
    }
  }

  //Adding a charity:
  addCharity(name, amount, date, image, collectionID, categoryID) {
    const id =
      this.currentUser.collections[collectionID - 1].categories[categoryID - 1]
        .charities.length + 1;

    const newCharity = {
      id,
      name,
      amount,
      date,
      image,
    };

    this.currentUser.collections[collectionID - 1].categories[
      categoryID - 1
    ].charities.push(newCharity);
  }

  //Deleting a charity:
  deleteCharity(collectionID, categoryID, charityID) {
    const deleteID = this.currentUser.collections[collectionID - 1].categories[
      categoryID - 1
    ].charities.findIndex((charity) => charity.id == charityID);
    if (deleteID !== -1) {
      this.currentUser.collections[collectionID - 1].categories[
        categoryID - 1
      ].charities.splice(deleteID, 1);
    }
  }
}
