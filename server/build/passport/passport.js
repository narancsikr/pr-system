"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_local_1 = require("passport-local");
const user_1 = require("../model/user");
const configurePassport = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('User is serialized.');
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log('User is deserialized.');
        done(null, user);
    });
    passport.use('local', new passport_local_1.Strategy((username, password, done) => {
        const query = user_1.User.findOne({ email: username });
        query.then(user => {
            if (user) {
                user.comparePassword(password, (error, _) => {
                    if (error) {
                        done('Incorrect username or password.');
                    }
                    else {
                        done(null, user._id);
                    }
                });
                /*
                if (user.password === password){
                    done(null, user);
                } else {
                    done('Incorrect username or password.');
                }
                */
            }
            else {
                done(null, undefined);
            }
        }).catch(error => {
            done(error);
        });
        /*
        if (username === 'test@test.com' && password === 'testpw') {
            done(null, new User(username, password));
        } else {
            done('Incorrect username or password.');
        }
        */
    }));
    return passport;
};
exports.configurePassport = configurePassport;
