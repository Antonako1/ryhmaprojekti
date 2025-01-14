import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../modules/User';
import dotenv from 'dotenv';

dotenv.config();

const UpdateUser = async (req: any, res: any): Promise<any> => {
  const { email, firstName, lastName, password } = req.body;
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  try {
    const secret = process.env.JWT_SECRET || '';
    const decoded: any = jwt.verify(token, secret); // Decode token to get the user

    // Find the user based on the token's email
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Allow the user to update their own account details
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) {
      user.passwordHash = await bcrypt.hash(password, 10);  //hash
    }

    await user.save(); 

    return res.status(200).json({
      message: 'User details updated successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error: ' + error.message });
  }
};

export default UpdateUser;
