!function(){"use strict";class e{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(e){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(let e=0;e<this.boardSize**2;e+=1){const s=document.createElement("div");s.classList.add("cell","map-tile","map-tile-"+(t=e,a=this.boardSize,0===t?"top-left":t===a-1?"top-right":t<a?"top":t===a*(a-1)?"bottom-left":t===a*a-1?"bottom-right":t%8==0?"left":(t+1)%8==0?"right":t>a*(a-1)?"bottom":"center")),s.addEventListener("mouseenter",(e=>this.onCellEnter(e))),s.addEventListener("mouseleave",(e=>this.onCellLeave(e))),s.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(s)}var t,a;this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const a of e){const e=this.boardEl.children[a.position],s=document.createElement("div");s.classList.add("character",a.character.type);const i=document.createElement("div");i.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((t=a.character.health)<15?"critical":t<50?"normal":"high")),r.style.width=`${a.character.health}%`,i.appendChild(r),s.appendChild(i),e.appendChild(s)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yellow";this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((a=>{const s=this.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),s.appendChild(i),i.addEventListener("animationend",(()=>{s.removeChild(i),a()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}var t=[{level:1,name:"prairie"},{level:2,name:"desert"},{level:3,name:"arctic"},{level:4,name:"mountain"}];const a=[],s=[];for(let e=0;e<8;e++)a.push(8*e),a.push(8*e+1),s.push(8*(e+1)-1),s.push(8*(e+1)-2);class i{constructor(e){this.characters=e}}function r(e,t,a){let s;const r=[],c=function*(e,t){for(;;){const a=new(0,e[Math.floor(Math.random()*e.length)])(Math.ceil(Math.random()*t));yield a}}(e,t);for(let e=0;e<a;e++)s=c.next().value,r.push(s);return new i(r)}class c{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"generic";try{if("Character"===new.target.name)throw new Error("Character can`t be called with new");this.level=e,this.attack=0,this.defence=0,this.health=50,this.type=t}catch(e){return alert(e),e}}levelUp(){this.level++,this.attack=Math.max(this.attack,this.attack*((80+this.health)/100)),this.defence=Math.max(this.defence,this.defence*((80+this.health)/100)),this.health+=80,this.health>=100&&(this.health=100)}updateCharacteristics(){const e=this.level;if(e>1){this.level=1;for(let t=2;t<=e;t++)this.levelUp()}}getTooltipStr(){return`🎖${this.level}⚔${this.attack}🛡${this.defence}❤${this.health}`}}class n{constructor(e,t){if(!(e instanceof c))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}inMovingArea(e){const t=this.position%8,a=Math.floor(this.position/8),s=e%8,i=Math.floor(e/8);return t-s==0&&Math.abs(a-i)<=this.character.dist||a-i==0&&Math.abs(t-s)<=this.character.dist||Math.abs(t-s)===Math.abs(a-i)&&Math.abs(t-s)<=this.character.dist}inAttackArea(e){const t=this.position%8,a=Math.floor(this.position/8),s=e%8,i=Math.floor(e/8);return Math.abs(t-s)<=this.character.distAttack&&Math.abs(a-i)<=this.character.distAttack}move(e){this.position=e}}class l extends c{constructor(e){super(e,"bowman"),this.attack=25,this.defence=25,this.dist=2,this.distAttack=2,super.updateCharacteristics()}}class h extends c{constructor(e){super(e,"swordsman"),this.attack=40,this.defence=10,this.dist=4,this.distAttack=1,super.updateCharacteristics()}}class o extends c{constructor(e){super(e,"magician"),this.attack=10,this.defence=40,this.dist=1,this.distAttack=4,super.updateCharacteristics()}}class d extends c{constructor(e){super(e,"daemon"),this.attack=10,this.defence=10,this.dist=1,this.distAttack=4,super.updateCharacteristics()}}class m extends c{constructor(e){super(e,"undead"),this.attack=40,this.defence=10,this.dist=4,this.distAttack=1,super.updateCharacteristics()}}class p extends c{constructor(e){super(e,"vampire"),this.attack=25,this.defence=25,this.dist=2,this.distAttack=2,super.updateCharacteristics()}}class C{constructor(){this.nextStep="user",this.activeCharacter=null,this.level=1,this.positionedCharacters=[]}setMaxPoints(e){null!==this.maxPoints&&void 0!==this.maxPoints?e>this.maxPoints&&(this.maxPoints=e):this.maxPoints=e}}class g{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}class u{constructor(e,t){this.gamePlay=e,this.stateService=t,this.gameState={},this.positionedCharacters=[]}async init(){let e=t.find((e=>1===e.level)).name;if(this.gamePlay.drawUi(e),this.loadGameState())e=t.find((e=>e.level===this.gameState.level)).name,this.gamePlay.drawUi(e),"comp"===this.gameState.nextStep&&await this.enemyMove();else{this.positionedCharacters=[],this.gameState=new C;const e=r([l,h,o],2,2),t=r([m,d],1,2);this.locateCharacters(e,"user"),this.locateCharacters(t,"enemy")}this.clearListeners(),this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this)),this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this)),this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this)),this.redrawAndUpdateSetOfCharacters()}loadGameState(){const e=new g(localStorage);let t;try{t=e.load()}catch(e){alert(e)}if(t){if(this.gameState=new C,this.gameState.nextStep=t.nextStep,this.gameState.level=t.level,this.positionedCharacters=[],t.positionedCharacters.forEach((e=>{const t=u.createCharacterCopy(e.character),a=new n(t,e.position);this.positionedCharacters.push(a)})),this.gameState.positionedCharacters=[],this.positionedCharacters.forEach((e=>{this.gameState.positionedCharacters.push(e)})),t.activeCharacter){const e=u.createCharacterCopy(t.activeCharacter.character);this.gameState.activeCharacter=new n(e,t.activeCharacter.position),this.activateNewCharacter(this.gameState.activeCharacter.position)}return!0}return!1}static createCharacterCopy(e){let t;switch(e.type){case"bowman":t=new l(e.level);break;case"magician":t=new o(e.level);break;case"swordsman":t=new h(e.level);break;case"daemon":t=new d(e.level);break;case"undead":t=new m(e.level);break;case"vampire":t=new p(e.level)}for(const a in e)t[a]=e[a];return t}locateCharacters(e,t){let i;i="user"===t?Array.from(a):Array.from(s),e.characters.forEach((e=>{for(;;){const t=Math.floor(Math.random()*i.length);if(-1===this.positionedCharacters.findIndex((e=>e.position===i[t]))){this.positionedCharacters.push(new n(e,i[t])),i.splice(t,1);break}}}))}getTeam(e){return"user"===e?this.positionedCharacters.filter((e=>["bowman","swordsman","magician"].includes(e.character.type))):this.positionedCharacters.filter((e=>["undead","daemon","vampire"].includes(e.character.type)))}activateNewCharacter(e){const t=this.positionedCharacters.find((t=>t.position===e)),a=this.gamePlay.cells.findIndex((e=>e.classList.contains("selected-yellow")));a>=0&&this.gamePlay.deselectCell(a),this.gamePlay.selectCell(e),this.gameState.activeCharacter=t}deactivateCharacter(e){this.gamePlay.deselectCell(e),e===this.gameState.activeCharacter.position&&(this.gameState.activeCharacter=null)}async onCellClick(t){if("user"===this.gameState.nextStep)if(this.gameState.activeCharacter)if(0!==this.gamePlay.cells[t].children.length){if(this.gamePlay.cells[t].children[0].classList.contains("character")){const a=this.positionedCharacters.find((e=>e.position===t));if(["bowman","swordsman","magician"].includes(a.character.type))this.activateNewCharacter(t),this.redrawAndUpdateSetOfCharacters();else if(this.gameState.activeCharacter.inAttackArea(t)){const e=this.gameState.activeCharacter.character,a=this.positionedCharacters.find((e=>e.position===t)).character;await this.attack(e,a,t,!0)}else e.showError("You can't attack so far from your position")}}else this.gameState.activeCharacter.inMovingArea(t)&&(this.gamePlay.deselectCell(this.gameState.activeCharacter.position),this.gamePlay.selectCell(t),this.gameState.activeCharacter.move(t),this.gameState.nextStep="comp",this.redrawAndUpdateSetOfCharacters(),await this.enemyMove());else if(0!==this.gamePlay.cells[t].children.length){if(this.gamePlay.cells[t].children[0].classList.contains("character")){const a=this.positionedCharacters.find((e=>e.position===t));["bowman","swordsman","magician"].includes(a.character.type)?(this.activateNewCharacter(t),this.redrawAndUpdateSetOfCharacters()):e.showError("You can select only cells with your characters")}}else e.showError("You can select only cells with your characters");else await this.enemyMove()}onCellEnter(e){if(0!==this.gamePlay.cells[e].children.length){if(this.gamePlay.cells[e].children[0].classList.contains("character")){const t=this.positionedCharacters.find((t=>t.position===e)),a=t.character.getTooltipStr();this.gamePlay.showCellTooltip(a,e),"user"===this.gameState.nextStep&&(["bowman","swordsman","magician"].includes(t.character.type)&&this.gamePlay.setCursor("pointer"),["daemon","undead","vampire"].includes(t.character.type)&&(this.gameState.activeCharacter?this.changeCursorSelection(e,"attack"):this.gamePlay.setCursor("not-allowed")))}}else"user"===this.gameState.nextStep&&(this.gameState.activeCharacter?this.changeCursorSelection(e,"move"):this.gamePlay.setCursor("not-allowed"))}changeCursorSelection(e,t){let a,s,i;"move"===t?(a="green",s="pointer",i=this.gameState.activeCharacter.inMovingArea(e)):"attack"===t&&(a="red",s="crosshair",i=this.gameState.activeCharacter.inAttackArea(e)),i?(this.gamePlay.setCursor(s),this.gamePlay.selectCell(e,a)):this.gamePlay.setCursor("not-allowed")}onCellLeave(e){this.gamePlay.setCursor("auto"),this.gamePlay.hideCellTooltip(e);const t=this.gamePlay.cells.findIndex((e=>e.classList.contains("selected-green")));t>=0&&this.gamePlay.deselectCell(t);const a=this.gamePlay.cells.findIndex((e=>e.classList.contains("selected-red")));a>=0&&this.gamePlay.deselectCell(a)}onNewGameClick(){new g(localStorage).save(null);const e=this.getPoints();this.gameState.setMaxPoints(e),this.init()}onSaveGameClick(){new g(localStorage).save(this.gameState)}onLoadGameClick(){this.loadGameState()}getPoints(){const e=this.getTeam("user");let t=0;return e.forEach((e=>{t+=e.character.health})),t}async attack(e,t,a){let s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.gameState.nextStep=s?"comp":"user";const i=Math.max(e.attack-t.defence,.1*e.attack);return await this.gamePlay.showDamage(a,i.toFixed(1)),t.health-=i,t.health<=0&&(this.positionedCharacters=this.positionedCharacters.filter((e=>e.character.health>0)),this.deactivateCharacter(a),this.checkNoEnemies(s))?s&&this.gameState.level<4?(this.levelUp(),"level"):(this.gameOver(),"over"):(this.redrawAndUpdateSetOfCharacters(),s&&await this.enemyMove(),"ok")}checkNoEnemies(e){let t;return t=e?this.getTeam("enemy"):this.getTeam("user"),0===t.length}levelUp(){this.gameState.level++;const e=t.find((e=>e.level===this.gameState.level)).name;this.gamePlay.drawUi(e),this.getTeam("user").forEach((e=>{e.character.levelUp()}));const a=r([m,d],1,2);this.locateCharacters(a,"enemy"),this.gameState.nextStep="user",this.redrawAndUpdateSetOfCharacters()}async enemyMove(){const e=this.getTeam("enemy"),t=e[Math.floor(Math.random()*e.length)],a=t.position%8,s=Math.floor(t.position/8),i=this.getTeam("user");let r,c,n,l=i[0],h=2*this.gamePlay.boardSize-2;if(i.forEach((e=>{const t=e.position%8,i=Math.floor(e.position/8),n=t-a,o=i-s,d=Math.abs(n)+Math.abs(o);d<h&&(l=e,h=d,r=n,c=o)})),t.inAttackArea(l.position))await this.attack(t.character,l.character,l.position);else for(;;){let e;if(Math.abs(r)>=Math.abs(c)){let i;e=Math.min(Math.abs(r)-1,t.character.distAttack),i=r>0?a+e:a-e,n=s*this.gamePlay.boardSize+i}else{let i;e=Math.min(Math.abs(c)-1,t.character.distAttack),i=c>0?s+e:s-e,n=i*this.gamePlay.boardSize+a}if(-1===this.positionedCharacters.findIndex((e=>e.position===n))){t.move(n),this.gameState.nextStep="user",this.redrawAndUpdateSetOfCharacters();break}}}gameOver(){this.clearFieldListeners(),this.gamePlay.redrawPositions(this.positionedCharacters),alert("Game over!"),this.onNewGameClick()}clearFieldListeners(){this.gamePlay.cellClickListeners=[],this.gamePlay.cellEnterListeners=[],this.gamePlay.cellLeaveListeners=[]}clearListeners(){this.gamePlay.cellClickListeners=[],this.gamePlay.cellEnterListeners=[],this.gamePlay.cellLeaveListeners=[],this.gamePlay.newGameListeners=[],this.gamePlay.saveGameListeners=[],this.gamePlay.loadGameListeners=[]}redrawAndUpdateSetOfCharacters(){this.gamePlay.redrawPositions(this.positionedCharacters),this.gameState.activeCharacter&&this.activateNewCharacter(this.gameState.activeCharacter.position),this.gameState.positionedCharacters=[],this.positionedCharacters.forEach((e=>{this.gameState.positionedCharacters.push(e)})),new g(localStorage).save(this.gameState)}}const v=new e;v.bindToDOM(document.querySelector("#game-container"));const f=new g(localStorage);new u(v,f).init()}();