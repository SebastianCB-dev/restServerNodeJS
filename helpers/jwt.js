import pkg from 'jsonwebtoken';

const { sign } = pkg;

export const generateJWT = (uid = '') => {

  return new Promise((resolve, reject) => {

    const payload = { uid };
    sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if( err ) {
        console.log(err);
        return reject('Could not generate token');
      }
      resolve(token);
    });

  });
}