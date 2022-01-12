window.dom = {
    create(string) {
        const container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(currentNode, nextNode) {
        console.log(currentNode.parentNode);
        console.log(currentNode.nextSibling);
        // 当前节点的爸爸，调用他爸爸的方法，然后把 nextNode 插入到 currentNode下一个节点  节点 节点的前面
        currentNode.parentNode.insertBefore(nextNode, currentNode.nextSibling);
    },
    before(currentNode, nextNode) {
        currentNode.parentNode.insertBefore(nextNode, currentNode);
    },
    append(parentNode, childNode) {
        parentNode.appendChild(childNode);
    },
    wrap(childNode, parentNode) {
        dom.before(childNode, parentNode);
        dom.append(parentNode, childNode);
    },
    remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node) {
        const array = [];
        let x = node.firstChild;
        while (x) {
            array.push(node.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },
    attr(node, name, value) { // 重载
        if (arguments.length === 3){
            node.setAttribute(name,value);
        }else if (arguments.length === 2) {
            return  node.getAttribute(name);
        }
    },
    test(node, string) {
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string;
            }else {
                node.textContent = string;
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return  node.innerText;
            }else {
                return  node.textContent;
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value;
        }else if (arguments.length === 2) {
            if (typeof  name === 'string') {
                return  node.style[name];
            }else if (name instanceof Object) {
                const object = name;
                for (let key in object) {
                    // key: border / color
                    node.style[key] = object[key];
                }
            }
        }
    },
    class : {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        has(node, className) {
            return node.classList.contains(className);
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        return  Array.from(node.parentNode.children).filter(n => n !== node);
    },
    next(node) {
        let x = node.nextSibling;
        while (x && x.nodeType === 3) {
             x = x.nextSibling;
        }
        return x;
    },
    previous(node) {
        let x = node.previousSibling;
        while (x && x.nodeType === 3) {
            x = x.previousSibling;
        }
        return x;
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList);
        }
    },
    index(node) {
        const list = dom.children(node.parentNode);
        let i;
        for (i = 0; i < list.length; i++) {
            if(list[i] === node) {
                break
            }
        }
        return i;
    }
};
