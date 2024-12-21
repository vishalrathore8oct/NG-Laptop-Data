import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LocalizationService } from 'src/localization/localization.service';
import { MessageService } from 'src/message/message.service';

dotenv.config();

@Injectable()
export class SwiftchatMessageService extends MessageService {
  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  private prepareRequestData(from: string, requestBody: string): any {
    return {
      to: from,
      type: 'text',
      text: {
        body: requestBody,
      },
    };
  }

  // this is my code for experiment for button
  private prepareRequestBtnData(from: string, requestBody: string): any {
    return {
      "to": from,
      "type": "button",
      "button": {
          "body": {
              "type": "text",
              "text": {
                  "body": requestBody
              }
          },
          "buttons": [
              {
                  "body": "Question 1",
                  "reply": "Question 1"
              },
              {
                  "body": "Question 2",
                  "reply": "Question 2"
              }
          ]
      }
  };
  }

  // this is my code for experiment button
  async sendWelcomeMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.welcomeMessage,
    );
    // console.log(requestData);
    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }

  async sendLanguageChangedMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.select_language,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }

  // this is my code for experiment
async sendHiMessage(from: string, language: string) {
  const localisedStrings = LocalizationService.getLocalisedString(language);
  const requestData = this.prepareRequestData(from, localisedStrings.hiMessage);
  const response = await this.sendMessage(
    this.baseUrl,
    requestData,
    this.apiKey,
  );
  return response;
}
// this is my code for experiment

// this is my code for experiment button
async sendButtonMessage(from: string, language: string) {
  const localisedStrings = LocalizationService.getLocalisedString(language);
  const requestData = this.prepareRequestBtnData(from, localisedStrings.buttonMessage);
  const response = await this.sendMessage(
    this.baseUrl,
    requestData,
    this.apiKey,
  );
  return response;  
}

// this is my code for experiment button

}
