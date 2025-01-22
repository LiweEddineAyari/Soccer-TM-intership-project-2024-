const userModel = require("../Models/userModel"); 
const jwt = require('jsonwebtoken')
const maxAge = 2 * 60 * 60

const createToken = (id) => {
  return jwt.sign({id},"token9antra", {expiresIn : maxAge})
}

module.exports.addUserC = async (req, res) => {
  const { name, age, email, password } = req.body;
  const role = "client";
  try {
    const user = new userModel({
      name,      age,      email,      password,      role,
    });
    const AddedUser = await user.save(); //

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  

module.exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsersByName = async (req, res) => {
  const { name } = req.params;

  try {
    const users = await userModel.find({ name: { $regex: name, $options: 'i' } }); // Case-insensitive search

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try{
    const {id} = req.params;
    const checkIFUserExists = await userModel.findById(id); //false => undefined
    if (!checkIFUserExists)
      {
          throw new Error ("User not found !")
      }
    await userModel.findByIdAndDelete(id);
    res.status(200).json("deleted");
  }catch (err) {
    res.status(500).json({message: err.message});
  };
 }

 module.exports.updateUserC = async (req, res) => {
  try {
  const {id} = req.params;
  const { name, age, email, password } = req.body;
  const role = "client";
  const checkIFUserExists = await userModel.findById(id); //false => undefined
  if (!checkIFUserExists)
    {
        throw new Error ("User not found !")
    }
    //
   updated = await userModel.findByIdAndUpdate(
    id, {
      $set:{ name ,email, age , password}
    },
    {new : true}
   )

    res.status(201).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateUserImg = async (req, res) => {
  try {
  const {id} = req.params;
  const { filename } = req.file;
  const checkIFUserExists = await userModel.findById(id); //false => undefined
  if (!checkIFUserExists)
    {
        throw new Error ("User not found !")
    }
    //
   updated = await userModel.findByIdAndUpdate(
    id, {
      $set:{ image_user : filename}
    },
    {new : true}
   )

    res.status(201).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.updateUserPassword = async (req, res) => {
  try {
  const {id} = req.params;
  const { password } = req.body;
  const role = "client";
  const checkIFUserExists = await userModel.findById(id); //false => undefined
  if (!checkIFUserExists)
    {
        throw new Error ("User not found !")
    }
    //
   updated = await userModel.findByIdAndUpdate(
    id, {
      $set:{  password}
    },
    {new : true}
   )

    res.status(201).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    
    if (!user) {
        return res.status(404).json({ message: "No user found" });
    }
    
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports.addUser = async (req, res) => {
  const { name, age, email, password } = req.body;
  const { filename } = req.file;
  const role = "client";
  console.log(req.body);
  try {
    const user = new userModel({
      name,      age,      email,      password,      role, image_user : filename
    });
    const AddedUser = await user.save(); //

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports.login = async(req, res) => {
  try {
    const { email , password } = req.body
    const user = await userModel.login(email, password)
    //await userModel.findByIdAndUpdate({id: user._id},{statu : true});
    const token = createToken(user._id)
    console.log("token : ",token)

    req.session.user = user;
    req.session.save();
    
    res.cookie('this_is_jstoken', token,{httpOnly: false, maxAge: maxAge * 1000})
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.logout = (req, res) => {
  try {
    // Clear cookies manually
    res.clearCookie('this_is_jstoken');
    res.clearCookie('connect.sid'); // Assuming you're using the default session cookie name
    
    req.session.user = null;  // assuming you store user data in session
    console.log('====================================');
    console.log(req.session.user);
    console.log('====================================');
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to regenerate session' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: error.message });
  }
};




