import React, { Component, useRef, useState, forwardRef } from 'react';

export default class Tamagotchi {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;

        this.hp = 100;
        this.age = 0;
        
        this.hunger = 0;
        this.fun = 0;
        this.tiredness = 0;
        this.anger = 0;
        this.fight = 0;
        this.love = 0;
        this.status = null;

        this.messages = [];
    }

    withUpdate({name, value}) {
        const clone = clone(Tamagotchi(this));
        clone[name] = value;
        return clone;
    }

    addStatus(newStatus) {
        this.status = newStatus;
        this.messages.push(`${this.firstName} is feeling ${this.status.name}`);
    }

    get getHpMessage() {
        if (25 < this.hp <= 50) {
            return true, `${this.firstName} is hurt!`;
        } else if (this.hp <= 25) {
            return true, `${this.firstName} is really hurt!!`;
        } else {
            return false, null;
        }
    }

    get getTiredMessage() {
        if (50 <= this.tiredness < 80) {
            return true, `${this.firstName} is sleepy!`;
        } else if (this.tiredness >= 80) {
            return true, `${this.firstName} is really sleepy!!`;
        } else {
            return false, null;
        }
    }

    clearMessages() {
        this.messages = [];
    }

    updateStatus() {
        this.messages.push(`${this.firstName} is feeling ${this.status.name}`);
        isHurt, hpMessage = this.getHpMessage();
        isTired, tiredMessage = this.getTiredMessage();
        if (isHurt) {
            this.messages.push(hpMessage);
        };
        if (isTired) {
            this.messages.push(tiredMessage);
        };
    }
}

// export default {Tamagotchi};
// export default Tamagotchi;