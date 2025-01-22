import { sql } from '@vercel/postgres';
import { pgTable, serial, varchar, integer, boolean, text, timestamp } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/vercel-postgres';


export const cartTable = pgTable('cartdata', {
  id: serial('id').primaryKey(), 
  user_id: varchar('user_id', { length: 255 }).notNull(), 
  product_id: varchar('product_id', { length: 255 }).notNull(), 
  product_title: varchar('product_title', { length: 255 }), 
  product_price: integer('product_price'), 
  product_quantity: integer('product_quantity'), 
  image_url: varchar('image_url', { length: 500 }), 
});

export const userTable = pgTable('users', {
  id:varchar('id', { length: 255 }).notNull(), 
  username: varchar('username', { length: 255 }).notNull().unique(), // Unique username
  email: varchar('email', { length: 255 }).notNull().unique(), // Unique email
  password: varchar('password', { length: 255 }).notNull(), // Hashed password
  isVerified: boolean('is_verified').default(false), // Default false for email verification
  forgotPasswordToken: text('forgot_password_token'), // Token for resetting passwords
  forgotPasswordTokenExpiry: timestamp('forgot_password_token_expiry'), // Expiry time for the token
  verifyToken: text('verify_token'), // Token for email verification
  verifyTokenExpiry: timestamp('verify_token_expiry'), // Expiry time for the verification token
});



export const db = drizzle(sql)


