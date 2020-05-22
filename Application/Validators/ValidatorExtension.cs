using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder.NotEmpty()
            .MinimumLength(6).WithMessage("Password must be at least 6 charecter")
            .Matches("[A-Z]").WithMessage("Password much contains upper case letter")
            .Matches("[a-z]").WithMessage("Password must have at least 1 charecter")
            .Matches("[0-9]").WithMessage("Password must contain a number")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain a non alphanumeric");
            return options;
        }
    }

}