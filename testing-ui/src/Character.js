import './Character.css';

function Character() {
  // needs this function to load default in index.js, but if I put any of the actual code in it, it creates two characters
}

function ssh() {
  function onload() {
    let animating = false;
    const size = {
      height: 30,
      width: 30,
    };
    const position = {
      x: 0,
      y: 0,
    };

    const pet = document.createElement('div');
    pet.setAttribute('id', 'petID');
    updatePosition(window.innerWidth - 150, window.innerHeight - 150);
    pet.classList.add('ssh-pet');
    document.body.appendChild(pet);

    const popupBox = document.createElement('span');
    popupBox.setAttribute('id', 'popupBoxID');
    popupBox.classList.add('popuptext');
    pet.appendChild(popupBox);
    popupBox.appendChild(document.createTextNode("Alert: CSCI 201 at 2:00 p.m."));
    pet.style.fontSize = "12px";
    pet.style.lineHeight = "16px";

    scheduleSomething();
    watchMouse();

    async function doSomething(random) {
      if (animating) return;

      animating = true;
      switch (random) {
        case 0:
          return shiftAway();
        case 1:
          return shiftAway();
        case 2:
          return shiftAway();
        case 3:
          return animateTeleport(880 + Math.abs(window.innerWidth - position.x), 400 + Math.abs(window.innerHeight - position.y));
        default:
          return animateRest();
      }
    }

    function animateRest() {
      return animateClass('rest');
    }

    async function shiftAway() {
      if (position.x < 40) {
        await animateShiftRight(true);
      } else if (position.x > window.innerWidth - 40) {
        await animateShiftLeft(true);
      } else if (Math.random() > 0.5) {
        await animateShiftLeft(true);
      } else {
        await animateShiftRight(true);
      }
    }

    async function animateShiftLeft(fast) {
      await animateClass(`shift-left ${fast ? 'fast' : ''}`);

      offsetPosition(-30, 0);
    }

    async function animateShiftRight(fast) {
      await animateClass(`shift-right ${fast ? 'fast' : ''}`);

      offsetPosition(30, 0);
    }

    async function animateTeleport(x, y) {
      await animateClass('disappear');
      pet.style.opacity = 0;
      updatePosition(x, y);
      pet.style.opacity = 100;
      await animateClass('reappear');
    }

    function animateClass(clsses, elem = pet) {
      return new Promise(resolve => {
        clsses.split(/\s+/).forEach(cls => {
          elem.classList.add(cls);
        });
        const onanimationend = () => {
          elem.removeEventListener('animationend', onanimationend);
          clsses.split(/\s+/).forEach(cls => {
            elem.classList.remove(cls);
          });
          resolve();
        };
        elem.addEventListener('animationend', onanimationend);
      });
    }

    function watchMouse() {
      let count = 0;
      pet.addEventListener('mousemove', async event => {
        pet.onclick = function() {
          popupBox.classList.toggle("show");
        }
      });
    }

    function scheduleSomething() {
      setTimeout(async () => {
        const choices = 10;
        const random = ~~(Math.random() * choices);

        if (!animating)
        {
          await doSomething(random);
          animating = false;
        }
        
        scheduleSomething();
      }, 800 + Math.random() * 1000);
    }

    function offsetPosition(x, y) {
      updatePosition(position.x + x, position.y + y);
    }

    function updatePosition(x, y) {
      pet.style.left = (position.x = x) + 'px';
      pet.style.top = (position.y = y) + 'px';
    }

    function onPet(x, y) {
      return within(
        x,
        y,
        position.x + size.width / 2,
        position.y + size.height / 2,
        size.width,
        size.height
      );
    }

    function within(x, y, cx, cy, w, h) {
      return x >= cx - w && x <= cx + w && y >= cy - h && y < cy + h;
    }

    function within_2(x, y, cx, cy, w, h) {
      return x >= cx && x <= cx + w && y >= cy && y < cy + h;
    }

    function debounce(fn, timeout = 200) {
      let _id;
      return function(...args) {
        clearTimeout(_id);
        _id = setTimeout(() => {
          fn(...args);
          _id = null;
        }, timeout);
      };
    }

    const _debounceMap = new Map();
    function debounceByElement(elem, fn, timeout, ...args) {
      if (!_debounceMap.has(elem)) {
        _debounceMap.set(elem, debounce(fn, timeout));
      }
      _debounceMap.get(elem)(...args);
    }

    function leftSideOf(elem, outer) {
      const { x, y, width, height } = elem.getBoundingClientRect();
      const to_x =
        x - size.width + (outer ? -marginLeft(elem) : paddingLeft(elem));
      const to_y = y + height / 2 - size.height / 2;
      if (position.x !== to_x || position.y !== to_y) {
        return [to_x, to_y];
      }
    }

    function paddingLeft(elem) {
      return (
        Number(
          window
            .getComputedStyle(elem)
            .getPropertyValue('padding-left')
            .replace(/px|r?em/, '')
        ) || 0
      );
    }

    function marginLeft(elem) {
      return (
        Number(
          window
            .getComputedStyle(elem)
            .getPropertyValue('margin-left')
            .replace(/px|r?em/, '')
        ) || 0
      );
    }
    function timeout(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
  }
  
  window.addEventListener('load', onload);
}

let script = document.createElement('script');
script.type = 'text/javascript';
script.text = `(${ssh.toString()})()`;
script.onload = function() {
  this.parentNode.removeChild(this);
};
  
(document.head || document.documentElement).appendChild(script);

export default Character; 