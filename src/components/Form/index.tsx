import React, { useState } from 'react';
import { 
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';

import { FeedbackType } from '../../components/Widget'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { theme } from '../../theme';
import { styles } from './styles';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null)

  const feedbackTypeInfo = feedbackTypes[feedbackType]
  
  function handleTakeScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error))
  }

  function handleRemoveScreenshot() {
    setScreenshot(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
          size={24}
          weight="bold"
          color={theme.colors.text_secondary} 
          />
        </TouchableOpacity>

        <View style={styles.titleContainer} >
          <Image
           source={feedbackTypeInfo.image}
           style={styles.image}
           />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
      />

      <View style={styles.footer} >
        <ScreenshotButton 
          onTakeShot={handleTakeScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot= {screenshot}
        />
        <Button 
          isLoading={false}
        />
      </View>

    </View>
  );
}