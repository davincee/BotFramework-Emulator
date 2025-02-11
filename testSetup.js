//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
window.require = function() {
  return {
    ipcRenderer: {
      on() {
        return null;
      },
      send() {
        return null;
      },
    },
    shell: {
      openExternal: window._openExternal,
    },
  };
};

window._openExternal = jest.fn(() => null);

window.define = function() {
  return null;
};

window.TextEncoder = class {
  encode() {
    return 'Hi! I am in your encode';
  }
};

window.TextDecoder = class {
  decode() {
    return 'Hi! I am in your decode';
  }
};

Object.defineProperty(window, 'crypto', {
  get: () => ({
    random: () => Math.random() * 1000,
    subtle: {
      digest: async () => Promise.resolve('Hi! I am in your digest'),
    },
  }),
});

window.MutationObserver = class {
  observe() {}
  disconnect() {}
};

jest.mock('electron', () => ({
  ipcMain: {
    on: () => null,
    send: () => null,
  },
  ipcRenderer: {
    on: () => null,
    send: () => null,
  },
}));
