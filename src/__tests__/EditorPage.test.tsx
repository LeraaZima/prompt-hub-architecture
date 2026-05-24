import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PromptProvider } from "../context/PromptContext";
import { AuthProvider } from "../context/AuthContext";
import EditorPage from "../pages/EditorPage";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <PromptProvider>{component}</PromptProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
};

describe("EditorPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("валидация формы редактора: показывает ошибки при пустых полях", async () => {
    renderWithProviders(<EditorPage />);

    // Используем более гибкий поиск кнопки
    const submitButton = screen.getByRole("button", {
      name: /сохранить промпт/i,
    });
    fireEvent.click(submitButton);

    const titleError = await screen.findByText(/Название не менее 3 символов/i);
    const contentError = await screen.findByText(
      /Текст промпта не менее 10 символов/i,
    );

    expect(titleError).toBeInTheDocument();
    expect(contentError).toBeInTheDocument();
  });

  test("форма отправляется при валидных данных", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    renderWithProviders(<EditorPage />);

    // Ищем поле ввода по имени или placeholder
    const titleInput = screen.getByPlaceholderText(
      /Например: Ассистент для код-ревью/i,
    );
    fireEvent.change(titleInput, { target: { value: "Test Prompt" } });

    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    fireEvent.change(textarea, {
      target: {
        value: "This is a valid prompt text with more than ten characters.",
      },
    });

    const submitButton = screen.getByRole("button", {
      name: /сохранить промпт/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });

    alertMock.mockRestore();
  });

  test('интеграционный тест: чекбокс "Опубликовать в хабе" работает', () => {
    renderWithProviders(<EditorPage />);

    const checkboxes = screen.getAllByRole("checkbox");
    const checkbox = checkboxes[0] as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test("поле ввода тегов работает корректно", () => {
    renderWithProviders(<EditorPage />);

    const tagsInput = screen.getByPlaceholderText(/coding, python, gpt4, ai/i);
    fireEvent.change(tagsInput, {
      target: { value: "react, typescript, testing" },
    });

    expect(tagsInput).toHaveValue("react, typescript, testing");
  });

  test("кнопка отправки существует и не заблокирована", () => {
    renderWithProviders(<EditorPage />);

    const submitButton = screen.getByRole("button", {
      name: /сохранить промпт/i,
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  test("заголовок страницы отображается корректно", () => {
    renderWithProviders(<EditorPage />);

    const heading = screen.getByText(/Создание промпта/i);
    expect(heading).toBeInTheDocument();
  });

  test("подсказка с поддерживаемым синтаксисом отображается", () => {
    renderWithProviders(<EditorPage />);

    const helpText = screen.getByText(
      /Поддерживается: ## заголовки, → стрелки/i,
    );
    expect(helpText).toBeInTheDocument();
  });
});
