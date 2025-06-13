import SpriteText from "three-spritetext";

export class Text {

    private text: SpriteText;

    constructor(text: string) {

        this.text = new SpriteText(text);

    }

    getText(): SpriteText {
        return this.text;
    }

    setText(text: string): void {
        this.text.text = text;
    }
}