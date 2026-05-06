class Player {
  /**
   * @param {number} number   - Player jersey number
   * @param {string} name     - Player's full name
   * @param {string} position - Player's position on the field
   */
  constructor(number, name, position) {
    this.number = number;
    this.name = name;
    this.position = position;
  }
}

module.exports = Player;
