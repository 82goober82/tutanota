// @flow
import m from "mithril"
import {Button} from "../gui/base/Button.js"
import {lang} from "../misc/LanguageViewModel.js"
import {ButtonType} from "../gui/base/Button"
import stream from "mithril/stream/stream.js"
import {inputLineHeight, px} from "../gui/size"

export class BuyOptionBox {

	_headingIdOrFunction: string;
	_actionId: string;
	_button: Button;
	view: Function;
	value: stream<string>;
	_helpLabel: string;
	_features: Array<string>;
	_injection: ?Component;

	constructor(headingIdOrFunction: string|lazy<string>, actionTextId: string, actionClickHandler: clickHandler, features: Array<string>, width: number, height: number) {
		this._headingIdOrFunction = headingIdOrFunction
		this._actionId = actionTextId
		this._button = new Button(actionTextId, actionClickHandler).setType(ButtonType.Login)
		this.value = stream(lang.get("emptyString_msg"))
		this._helpLabel = stream(lang.get("emptyString_msg"))
		this._features = features

		this.view = (): ?VirtualElement => {
			return m("", {
				style: {
					margin: "10px",
					width: px(width),
					padding: "10px"
				}
			}, [m(".buyOptionBox", {
				style: {height: px(height)}
			}, [
				m(".h4.center.dialog-header.dialog-header-line-height", this._headingIdOrFunction instanceof Function ? this._headingIdOrFunction() : lang.get(this._headingIdOrFunction)),
				m(".h1.center.pt", this.value()),
				m(".small.center", this._helpLabel),
				this._injection ? m(this._injection) : null,
				m(".button-min-height", {
					style: {
						position: "absolute",
						bottom: px(10),
						left: px(10),
						right: px(10)
					}
				}, m(this._button))
			]), m(".flex.flex-column.pt", {
				style: {lineHeight: px(inputLineHeight)}
			}, this._features.map(f => m(".center.dialog-header.dialog-header-line-height.text-ellipsis",
				// {style: {borderBottom: `1px solid ${theme.content_border}`}},
				f)))])
		}
	}

	setValue(value: string): BuyOptionBox {
		this.value(value)
		return this
	}

	setHelpLabel(value: string): BuyOptionBox {
		this._helpLabel = value
		return this
	}

	setInjection(injection: Component) {
		this._injection = injection
	}
}










