import { Injectable } from '@nestjs/common';
import IntentClassifier from '../intent/intent.classifier';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';

@Injectable()
export class ChatbotService {
  private readonly intentClassifier: IntentClassifier;
  private readonly message: MessageService;
  private readonly userService: UserService;

  constructor(
    intentClassifier: IntentClassifier,
    message: MessageService,
    userService: UserService,
  ) {
    this.intentClassifier = intentClassifier;
    this.message = message;
    this.userService = userService;
  }

  public async processMessage(body: any): Promise<any> {
    const { from, type, text, button_response } = body;
    console.log(body);


    if (type === 'text') {
      const userData = await this.userService.findUserByMobileNumber(from);
      // console.log(userData);
      const { intent, entities } = this.intentClassifier.getIntent(text.body);

      // console.log(intent, entities);
      if (userData.language === 'english' || userData.language === 'hindi') {
        await this.userService.saveUser(userData);
      }

      // this is my code for experiment
      if (intent === 'greeting' && text.body === 'hi') {
        this.message.sendHiMessage(from, userData.language);
      }
      // this is my code for experiment

      // this is my code for experiment button
      else if (intent === 'greeting' && text.body === 'button') {
        this.message.sendButtonMessage(from, userData.language);
      }
      // this is my code for experiment button
      else if (intent === 'greeting') {
        this.message.sendWelcomeMessage(from, userData.language);
      } else if (intent === 'select_language') {
        const selectedLanguage = entities[0];
        const userData = await this.userService.findUserByMobileNumber(from);
        userData.language = selectedLanguage;
        await this.userService.saveUser(userData);
        this.message.sendLanguageChangedMessage(from, userData.language);
      }
      return 'ok';

    } else if (type === 'button_response') {
      const userData = await this.userService.findUserByMobileNumber(from);
      // console.log(userData);
      if (userData.language === 'english' || userData.language === 'hindi') {
        await this.userService.saveUser(userData);
      }

      console.log("user response", button_response.body);

      return 'ok';
    }
  }
}

export default ChatbotService;
